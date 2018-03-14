'use strict'

const mongoose = require('mongoose');


//set up the schema/ structure of data
let pastureSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    // index: true,
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

pastureSchema.index({ user: 1 });

let Pasture = mongoose.model('Pasture', pastureSchema);

module.exports = { Pasture };