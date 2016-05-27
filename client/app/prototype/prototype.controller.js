'use strict';
(function(){

class PrototypeComponent {

  constructor(socket, Hand, Fingers, SceneModel, lightHandModel, $scope) {

    var self = this;

    this.lightHandModel = lightHandModel;
    this.handies = {};
    this.loop = {};
    this.sceneModel = SceneModel.build();
    this.clientSocket = socket.socket;
    var clientSocket = socket.socket;

    //Callback Funktion vom Backend empfangene Koordinationsdaten
    this.clientSocket.on('movement', function(hand) {
      var index = hand.index;
      var handy = (self.handies[index] || (self.handies[index] = Hand.build(self.sceneModel.scene, handData)));
      handy.outputData(index, hand);
    });
  }

  $onInit() {
    var self = this;

    //Leapmotion Loop Funktion
    this.loop.animate = function(frame) {
      frame.hands.forEach(function(hand, index) {
        self.clientSocket.emit('movement', self.lightHandModel.build(hand,index));
      });
      self.sceneModel.update();
    };

    this.loop = Leap.loop(this.loop.animate);
    this.loop.use('screenPosition', {
      scale: 0.25
    }); // use = plugin
    Leap.loopController.setBackground(true);
  }
}

angular.module('cooperationprototypingApp')
  .component('prototype', {
    templateUrl: 'app/prototype/prototype.html',
    controller: PrototypeComponent
  });

})();
