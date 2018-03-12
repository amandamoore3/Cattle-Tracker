'use strict'

const mongoose = require('mongoose');



//set up the schema/ structure of data
let breedingSchema = mongoose.Schema({
  tag_id: {
    type: String,
    index: true,
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
    required: true,
    trim: true
  },
  sire: {
    type: String,
    required: true,
    trim: true
  },
  technician: {
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
}, { emitIndexErrors: true });

breedingSchema.index({ user: 1, tag_id: -1 }, { unique: true });

let Breeding = mongoose.model('Breeding', breedingSchema);

module.exports = { Breeding };