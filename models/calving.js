'use strict'

const mongoose = require('mongoose');

//set up the schema/ structure of data
let calvingSchema = mongoose.Schema({
  tag_id: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: String,
    index: true,
    required: true
  },
  calf_id: {
    type: String,
    required: true,
    trim: true
  },
  season: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true,
    trim: true
  },
  sex: {
    type: String,
    required: true,
    trim: true
  },
  sire: {
    type: String,
    required: true,
    trim: true
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

calvingSchema.index({ user: 1 });

let Calving = mongoose.model('Calving', calvingSchema);

module.exports = { Calving };