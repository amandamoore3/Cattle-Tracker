'use strict'

const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;


//set up the schema/ structure of data
let pregCheckSchema = mongoose.Schema({
  tag_id: {
    type: String,
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
});

let PregCheck = mongoose.model('PregCheck', pregCheckSchema);


module.exports = {
  PregCheck
};
