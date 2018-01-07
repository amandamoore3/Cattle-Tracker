'use strict'

const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;


//set up the schema/ structure of data
let pregCheckSchema = mongoose.Schema({
  cow_id: {
    type: ObjectId
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
