'use strict'

const mongoose = require('mongoose');

//set up the schema/ structure of data
let pastureMovementsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
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
  dateMoved: {
    type: Date,
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

pastureMovementsSchema.index({ user: 1 });

let PastureMovements = mongoose.model('PastureMovements', pastureMovementsSchema);

module.exports = { PastureMovements };