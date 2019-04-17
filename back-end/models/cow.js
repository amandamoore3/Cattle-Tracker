'use strict'

const mongoose = require('mongoose');

//set up the schema/ structure of data
let cowSchema = mongoose.Schema({
  tag_id: {
    type: String,
    index: true,
    required: true,
    minLength: 1,
    trim: true
  },
  user: {
    type: String,
    index: true,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    trim: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  },
  status: {
    type: String,
    required: true,
    default: "Active"
  },
  sire: {
    type: String,
    trim: true
  },
  dam: {
    type: String,
    trim: true
  },
  status_date: {
    type: Date,
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
  status_comments: {
    type: String,
    trim: true
  }
}, { emitIndexErrors: true });

cowSchema.index({ user: 1, tag_id: -1 }, { unique: true });

let Cow = mongoose.model('Cow', cowSchema);


module.exports = { Cow };