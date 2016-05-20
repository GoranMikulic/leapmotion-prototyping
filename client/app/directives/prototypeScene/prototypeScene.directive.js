'use strict';

angular.module('cooperationprototypingApp')
  .directive('prototypeScene', function(socket, Hand, Fingers) {
    return {
      templateUrl: 'app/directives/prototypeScene/prototypeScene.html',
      restrict: 'E',
      link: function(scope, element, attrs) {

        var fingerlings = {};
        var handies = {};
        var loop = {};

        var stats, renderer, scene, camera, controls;

        var clientSocket = socket.socket;

        clientSocket.on('movement', function(object) {

          var index = object.index;
          var hand = object;
          var handy = (handies[index] || (handies[index] = Hand.build(scene, handData)));
          handy.outputData(index, hand);
          hand.fingers.forEach(function(finger, index) {
            var fingerling = (fingerlings[index] || (fingerlings[index] = Fingers.build(scene, fingerData)));
            fingerling.outputData(index, finger);
          });

          renderer.render(scene, camera);
          controls.update();
          stats.update();
        });

        loop.animate = function(frame) {
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

        function initStats() {
          var stats = new Stats();
          stats.domElement.style.cssText = 'position: absolute; right: 0; top: 0; z-index: 100; ';
          document.body.appendChild(stats.domElement);

          return stats;
        }

        function initRenderer() {
          var renderer = new THREE.WebGLRenderer({
            alpha: 1,
            antialias: true,
            clearColor: 0xffffff
          });

          renderer.setSize(window.innerWidth, window.innerHeight);
          document.body.appendChild(renderer.domElement);

          return renderer;
        }

        function initMeshBox() {
          // ground box
          var geometry = new THREE.BoxGeometry(500, 2, 500);
          var material = new THREE.MeshNormalMaterial();
          var mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(0, -1, 0);

          return mesh;
        }

        function init() {
          stats = initStats();

          renderer = initRenderer();

          camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
          camera.position.set(500, 500, 500);
          controls = new THREE.TrackballControls(camera, renderer.domElement);
          scene = new THREE.Scene();

          var mesh = initMeshBox();
          scene.add(mesh);
          mesh = new THREE.GridHelper(250, 10);
          scene.add(mesh);

          // axes
          var axis = new THREE.AxisHelper(250);
          scene.add(axis);

          renderer.render(scene, camera);

        }

        loop = Leap.loop(loop.animate);
        loop.use('screenPosition', {
          scale: 0.25
        }); // use = plugin

        Leap.loopController.setBackground(true);

        init();

      }
    };
  });
