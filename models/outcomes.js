'use strict'

const mongoose = require('mongoose');



//set up the schema/ structure of data
let outcomeSchema = mongoose.Schema({
  cow_id: {
    type: ObjectId
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
    type: String,
    required: true,
    trim: true
  },
  causeOfDeath: {
    type: String,
    required: true,
    trim: true
  },
  comments: {
    type: String,
    required: true,
    trim: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

let Outcomes = mongoose.model('Outcomes', outcomeSchema);


module.exports = {
  Outcomes
};
