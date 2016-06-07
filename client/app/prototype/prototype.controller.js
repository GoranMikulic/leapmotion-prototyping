  'use strict';
  (function() {

    class PrototypeComponent {

      constructor(socket, Hand, Fingers, SceneModel, lightHandModel, $scope, ObjectsUtils) {

        var self = this;

        // Id der Hand - wird zur Unterscheidung der clients genutzt,
        // wenn eine hand mit dem Index schon erzeugt wurde, soll diese
        // nicht nochmal erzeugt werden. Timestamp wird beim öffnen der Anwendung
        // im jeweiligen Client gesetzt.
        this.handIndex = new Date().getTime();

        // Eine schlankere Version des Datenmodells für Koordinaten einer Hand,
        // das vom Leapmotion Controller genutzte Datenmodell wird konvertiert, somit
        // werden nur die notwendigen Koordinaten an den Server gesendet
        this.lightHandModel = lightHandModel;
        // Hier wird die Id von jeder empfangenen Hand bzw. Client gespeichert
        // damit entschieden werden kann, ob eine neue Hand erzeugt werden muss,
        // oder dieser bereits vorhanden ist
        this.loadedHands = {};
        // Schleife der Leapmotion Bibliothek - siehe this.loop.animate -
        // this.loop.animate definiert was bei jedem emfpangenen Frame passiert
        this.loop = {};
        // Definiert die 3D-Umgebung, Ausrichtung, Schwerkraft, Kameraposition etc.
        this.sceneModel = SceneModel.build();
        // Socket zur Kommunikation mit dem Server
        this.clientSocket = socket.socket;
        // Util-Klasse in der wiederverwendbare 3D-Objekte definiert werden
        this.utils = ObjectsUtils;

        var clientSocket = socket.socket;

        // Callback Funktion vom Backend empfangene Koordinationsdaten
        this.clientSocket.on('movement', function(hand) {
          var index = hand.index;
          var handy = (self.loadedHands[index] || (self.loadedHands[index] = Hand.build(self.sceneModel.scene, handData)));
          handy.outputData(index, hand);
        });

        // Wenn 'object' Nachricht vom Socket erhalten wird, soll das entsprechende Objekt angelegt werden
        // TODO: aktuell keine Synchronisation der Position der Objekte
        this.clientSocket.on('object', function(type) {
          if (type === 'cube') {
            self.sceneModel.scene.add(self.utils.getCube());
          } else if (type === 'ball') {
            self.sceneModel.scene.add(self.utils.getBall());
          }
        });
      }

      $onInit() {
        var self = this;
        self.clientIndex = {};

        // Leapmotion Loop Funktion - definiert was beim Empfangen von Leapmotion Frames
        // mit den Koordinaten geschehen soll
        this.loop.animate = function(frame) {
          frame.hands.forEach(function(hand, index) {
            if (!self.clientIndex[index]) {
              self.clientIndex[index] = new Date().getTime();
            }
            self.clientSocket.emit('movement', self.lightHandModel.build(hand, self.clientIndex[index]));
          });
          self.sceneModel.update();
        };

        // Auch ohne Controller soll die Umgebung aktualisiert werden
        setInterval(function() {
          self.sceneModel.update();
        }, 50);

        this.loop = Leap.loop(this.loop.animate);

        this.loop.use('screenPosition', {
          scale: 0.25
        }); // use = plugin
        Leap.loopController.setBackground(true);
      }

      /*
      * Diese Methode wird in der GUI Verwendet um 3D-Objekte anzulegen
      */
      addObject(type) {
        var self = this;
        self.clientSocket.emit('object', type);
      }


    }

    /**
    * Definition des Controllers
    */
    angular.module('cooperationprototypingApp')
      .component('prototype', {
        templateUrl: 'app/prototype/prototype.html',
        controller: PrototypeComponent
      });

  })();
