/**
 * Movement model events
 */

'use strict';

import {EventEmitter} from 'events';
import Movement from './movement.model';
var MovementEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MovementEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Movement.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MovementEvents.emit(event + ':' + doc._id, doc);
    MovementEvents.emit(event, doc);
  }
}

export default MovementEvents;
