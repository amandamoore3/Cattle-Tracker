'use strict'

const mongoose = require('mongoose');


//set up the schema/ structure of data
let outcomeSchema = mongoose.Schema({
  tag_id: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  weight: {
    type: Number,
    trim: true
  },
  causeOfDeath: {
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

let Outcome = mongoose.model('Outcome', outcomeSchema);


module.exports = { Outcome };