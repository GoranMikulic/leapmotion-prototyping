'use strict';
(function(){

class PrototypeComponent {
  constructor(socket, Hand, Fingers, SceneModel, lightHandModel) {

    var self = this;
    //this.fingerlings = {};
    this.handies = {};
    this.loop = {};
    this.sceneModel = SceneModel.build();
    this.clientSocket = socket.socket;
    var clientSocket = socket.socket;

    this.loop.animate = function(frame) {
      frame.hands.forEach(function(hand, index) {
        clientSocket.emit('movement', lightHandModel.build(hand,index));
      });
    };
    this.loop = Leap.loop(this.loop.animate);
    this.loop.use('screenPosition', {
      scale: 0.25
    }); // use = plugin
    Leap.loopController.setBackground(true);

    var stats = new Stats();
    stats.domElement.style.cssText = 'position: absolute; right: 0; top: 0; z-index: 100; ';
    document.body.appendChild(stats.domElement);

    this.clientSocket.on('movement', function(hand) {
      var index = hand.index;
      var handy = (self.handies[index] || (self.handies[index] = Hand.build(self.sceneModel.scene, handData)));
      handy.outputData(index, hand);
      self.sceneModel.update();
      stats.update();
    });
  }
}

angular.module('cooperationprototypingApp')
  .component('prototype', {
    templateUrl: 'app/prototype/prototype.html',
    controller: PrototypeComponent
  });

})();
