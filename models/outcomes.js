'use strict'

const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;


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


module.exports = {
  Outcome
};
