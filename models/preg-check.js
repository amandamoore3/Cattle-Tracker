'use strict'

const mongoose = require('mongoose');


//set up the schema/ structure of data
let pregCheckSchema = mongoose.Schema({
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
  date: {
    type: Date,
    required: true,
    trim: true
  },
  method: {
    type: String,
    trim: true
  },
  result: {
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

pregCheckSchema.index({ user: 1 });

let PregCheck = mongoose.model('PregCheck', pregCheckSchema);

module.exports = { PregCheck };