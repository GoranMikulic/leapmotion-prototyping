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
      var index = hand.index;
      var handy = (self.handies[index] || (self.handies[index] = Hand.build(self.sceneModel.scene, handData)));
      handy.outputData(index, hand);
    });

    this.clientSocket.on('object', function(type) {
      if(type === 'cube') {
          self.sceneModel.scene.add(self.utils.getCube());
      } else if (type === 'ball') {
          self.sceneModel.scene.add(self.utils.getBall());
      }
    });
  }

  $onInit() {
    var self = this;
    self.clientIndex =  {};

    //Leapmotion Loop Function
    this.loop.animate = function(frame) {
      frame.hands.forEach(function(hand, index) {
        if(!self.clientIndex[index]) {
          self.clientIndex[index] = new Date().getTime();
        }
        self.clientSocket.emit('movement', self.lightHandModel.build(hand, self.clientIndex[index]));
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
    var self = this;
    self.clientSocket.emit('object', type);
  }


}

angular.module('cooperationprototypingApp')
  .component('prototype', {
    templateUrl: 'app/prototype/prototype.html',
    controller: PrototypeComponent
  });

})();
