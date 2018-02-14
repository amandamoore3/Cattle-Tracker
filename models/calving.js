'use strict'

const mongoose = require('mongoose');



//set up the schema/ structure of data
let calvingSchema = mongoose.Schema({
  tag_id: {
    type: String,
    required: true,
    trim: true
  },
  calf_id: {
    type: String,
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
});

let Calving = mongoose.model('Calving', calvingSchema);


module.exports = { Calving };