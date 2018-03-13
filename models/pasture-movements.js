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
    required: true
  },
  dateMoved: {
    type: Date,
    default: Date(),
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

let PastureMovements = mongoose.model('PastureMovements', pastureMovementsSchema);


module.exports = { PastureMovements };