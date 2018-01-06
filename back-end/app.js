'use strict'
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const {
  mongooseConnect
} = require('../db/mongoose.js');

const {
  Cow
} = require('../models/cow.js');


let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/static'));



// GET ALL DATA FROM CATTLE TABLE
app.get('/cattle', (req, res) => {
  Cow.find()
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
// GET ALL DATA FROM CATTLE TABLE


// POST TO CATTLE TABLE
app.post('/cattle', (req, res) => {
  let newCow = new Cow({
    tag: req.body.tag,
    type: req.body.type,
    dob: req.body.dob,
    pasture: req.body.pasture,
    sire: req.body.sire,
    dam: req.body.dam
  });
  newCow.save()
    .then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});
// POST TO CATTLE TABLE


app.listen(3004, () => {
  console.log('listening on port 3000');
});
