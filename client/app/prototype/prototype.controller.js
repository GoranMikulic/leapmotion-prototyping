'use strict';
(function(){

class PrototypeComponent {
  constructor(socket, Hand, Fingers, SceneModel) {

    var self = this;
    this.fingerlings = {};
    this.handies = {};
    this.loop = {};
    this.sceneModel = SceneModel.build();

    var clientSocket = socket.socket;

    this.clientSocket = socket.socket;

    this.loop.animate = function(frame) {
      frame.hands.forEach(function(hand, index) {

        angular.forEach(hand.fingers, function(finger, fingerKey) {
          angular.forEach(finger.bones, function(bone, boneKey) {
            delete hand.fingers[fingerKey].bones[boneKey].finger;
            delete hand.fingers[fingerKey].frame;
          });
        });


        var pitch = hand.pitch();
        var yaw = hand.yaw();
        var roll = hand.roll();

        var slimHandModel = {
          'stabilizedPalmPosition': hand.stabilizedPalmPosition,
          'fingers': hand.fingers,
          'pitch': pitch,
          'yaw': yaw,
          'roll': roll,
          'index': index
        };

        clientSocket.emit('movement', slimHandModel);

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

    this.clientSocket.on('movement', function(object) {

      var index = object.index;
      var hand = object;
      var handy = (self.handies[index] || (self.handies[index] = Hand.build(self.sceneModel.scene, handData)));
      handy.outputData(index, hand);
      hand.fingers.forEach(function(finger, index) {
        var fingerling = (self.fingerlings[index] || (self.fingerlings[index] = Fingers.build(self.sceneModel.scene, fingerData)));
        fingerling.outputData(index, finger);
      });

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
