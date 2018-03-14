'use strict'

const mongoose = require('mongoose');


//set up the schema/ structure of data
let calvingSeasonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: String,
    index: true,
    required: true
  },
  comments: {
    type: String,
    trim: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  }
}, { emitIndexErrors: true });

calvingSeasonSchema.index({ user: 1 });

let CalvingSeason = mongoose.model('CalvingSeason', calvingSeasonSchema);

module.exports = { CalvingSeason };