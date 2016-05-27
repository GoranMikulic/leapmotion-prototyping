'use strict';
(function(){

class PrototypeComponent {

  constructor(socket, Hand, Fingers, SceneModel, lightHandModel, $scope, ObjectsUtils) {

    var self = this;
    this.handIndex = new Date().getTime();
    this.lightHandModel = lightHandModel;
    this.handies = {};
    this.loop = {};
    this.sceneModel = SceneModel.build();
    this.clientSocket = socket.socket;
    this.utils = ObjectsUtils;

    var clientSocket = socket.socket;

    //Callback Funktion vom Backend empfangene Koordinationsdaten
    this.clientSocket.on('movement', function(hand) {
      //var index = hand.index;
      var index = this.handIndex;
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

  addObject(type) {
    if(type === 'cube') {
        this.sceneModel.scene.add(this.utils.getCube());
    } else if (type === 'ball') {
        this.sceneModel.scene.add(this.utils.getBall());
    }
  }
}

angular.module('cooperationprototypingApp')
  .component('prototype', {
    templateUrl: 'app/prototype/prototype.html',
    controller: PrototypeComponent
  });

})();
