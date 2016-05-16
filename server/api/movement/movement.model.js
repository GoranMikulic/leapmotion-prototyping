'use strict';

import mongoose from 'mongoose';

var MovementSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Movement', MovementSchema);
