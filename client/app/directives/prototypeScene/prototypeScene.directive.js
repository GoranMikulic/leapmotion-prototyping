'use strict';

angular.module('cooperationprototypingApp')
  .directive('prototypeScene', function(socket) {
    return {
      templateUrl: 'app/directives/prototypeScene/prototypeScene.html',
      restrict: 'E',
      link: function(scope, element, attrs) {

        var fingerlings = {};
        var handies = {};
        var loop = {};

        var info, stats, renderer, scene, camera, controls;

        var clientSocket = socket.socket;
        var handy2initialized = false;

        clientSocket.on('movement', function(object) {

          var index = object.index;
          var hand = object;
          var handy = (handies[index] || (handies[index] = new Handy()));


          if(!handy2initialized) {
              var handy2 = new Handy();
              handy2.outputData(index, hand);
              handy2initialized = true;
          }

          handy.outputData(index, hand);

          hand.fingers.forEach(function(finger, index) {
            var fingerling = (fingerlings[index] || (fingerlings[index] = new Fingerling()));
            fingerling.outputData(index, finger);

          });

          renderer.render(scene, camera);
          controls.update();
          stats.update();
        });

        loop.animate = function(frame) {
          frame.hands.forEach(function(hand, index) {
            //console.log(hand);

            angular.forEach(hand.fingers, function(finger, fingerKey) {
              angular.forEach(finger.bones, function(bone, boneKey) {
                delete hand.fingers[fingerKey].bones[boneKey].finger;
                delete hand.fingers[fingerKey].frame;
                console.log("bone deleted");
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
            //clientSocket.emit('info', 1);
          });
          // frame.hands.forEach(function(hand, index) {
          //
          //   var handy = (handies[index] || (handies[index] = new Handy()));
          //   handy.outputData(index, hand);
          //
          //   hand.fingers.forEach(function(finger, index) {
          //
          //     var fingerling = (fingerlings[index] || (fingerlings[index] = new Fingerling()));
          //     fingerling.outputData(index, finger);
          //
          //   });
          //
          // });
          //
          // renderer.render(scene, camera);
          // controls.update();
          // stats.update();

        };


        //Der Handballen
        var Handy = function() {
          var handy = this;
          var msg = handData.appendChild(document.createElement('div'));

          var geometry = new THREE.BoxGeometry(50, 20, 50);
          var material = new THREE.MeshNormalMaterial();
          var box = new THREE.Mesh(geometry, material);
          scene.add(box);

          handy.outputData = function(index, hand) {

            msg.innerHTML = 'Hand id:' + index + ' x:' + hand.stabilizedPalmPosition[0].toFixed(0) +
              ' y:' + hand.stabilizedPalmPosition[1].toFixed(0) + ' z:' + hand.stabilizedPalmPosition[2].toFixed(0);
            box.position.set(hand.stabilizedPalmPosition[0], hand.stabilizedPalmPosition[1], hand.stabilizedPalmPosition[2]);
            box.rotation.set(hand.pitch, -hand.yaw, hand.roll);
          };

        };

        //Finger Method
        var Fingerling = function() {

          var fingerling = this;
          var msg = fingerData.appendChild(document.createElement('div'));

          var tip = addPhalange();
          var dip = addPhalange();
          var pip = addPhalange();
          var mcp = addPhalange();
          var carp = addPhalange();

          fingerling.outputData = function(index, finger) {

            msg.innerHTML = 'Finger Method: ' +
              'finger id:' + index + ' tip x:' + finger.tipPosition[0].toFixed(0) +
              ' y:' + finger.tipPosition[1].toFixed(0) + ' z:' + finger.tipPosition[2].toFixed(0);

            tip.position.set(finger.tipPosition[0], finger.tipPosition[1], finger.tipPosition[2]);
            dip.position.set(finger.dipPosition[0], finger.dipPosition[1], finger.dipPosition[2]);
            pip.position.set(finger.pipPosition[0], finger.pipPosition[1], finger.pipPosition[2]);
            mcp.position.set(finger.mcpPosition[0], finger.mcpPosition[1], finger.mcpPosition[2]);
            carp.position.set(finger.carpPosition[0], finger.carpPosition[1], finger.carpPosition[2]);

            updatePhalange(tip, dip);
            updatePhalange(dip, pip);
            updatePhalange(pip, mcp);

            if (finger.type > 0) {
              updatePhalange(mcp, carp);

            }

          };

        };

        // // Bone Method
        // var Fingerling = function() {
        //
        //   var fingerling = this;
        //   var msg = fingerData.appendChild(document.createElement('div'));
        //
        //   var phalanges = [];
        //
        //   for (var i = 0; i < 4; i++) {
        //     var phalange = addPhalange();
        //     phalanges.push(phalange)
        //   }
        //
        //   fingerling.outputData = function(index, finger) {
        //
        //     msg.innerHTML = 'Bone Method ~ ' +
        //       'finger tip: ' + index + ' x:' + finger.tipPosition[0].toFixed(0) +
        //       ' y:' + finger.tipPosition[1].toFixed(0) + ' z:' + finger.tipPosition[2].toFixed(0);
        //
        //     //console.log( finger );
        //
        //     for (var i = 0; i < 4; i++) {
        //       var bone = finger.bones[i];
        //       var cen = bone.center();
        //       var len = bone.length;
        //
        //       var phalange = phalanges[i];
        //       phalange.position.set(cen[0], cen[1], cen[2]);
        //       if (index > 0 || i > 0) {
        //         phalange.scale.z = len;
        //       }
        //     }
        //
        //     // Eventually will look at using bone.basis XYZ-axis data; Will it produce more concise code?
        //
        //     phalanges[3].lookAt(v(finger.tipPosition[0], finger.tipPosition[1], finger.tipPosition[2]));
        //     phalanges[2].lookAt(v(finger.dipPosition[0], finger.dipPosition[1], finger.dipPosition[2]));
        //     phalanges[1].lookAt(v(finger.pipPosition[0], finger.pipPosition[1], finger.pipPosition[2]));
        //     if (index > 0) {
        //       phalanges[0].lookAt(v(finger.mcpPosition[0], finger.mcpPosition[1], finger.mcpPosition[2]));
        //     }
        //
        //   };
        //
        // };

        function addPhalange() {

          var geometry = new THREE.BoxGeometry(20, 20, 1);
          var material = new THREE.MeshNormalMaterial();
          var phalange = new THREE.Mesh(geometry, material);
          scene.add(phalange);
          return phalange;

        }

        function updatePhalange(phalange, nextPhalange) {

          phalange.lookAt(nextPhalange.position);
          length = phalange.position.distanceTo(nextPhalange.position);
          phalange.translateZ(0.5 * length);
          phalange.scale.set(1, 1, length);

        }

        function v(x, y, z) {
          return new THREE.Vector3(x, y, z);
        }



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

          // var boxgeo = new THREE.BoxGeometry( 100, 100, 100 );
          // var boxmaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
          // var cube = new THREE.Mesh( boxgeo, boxmaterial );
          // scene.add(cube);

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
