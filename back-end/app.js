'use strict'
const bodyParser = require('body-parser');
const express = require('express');

const {
  mongooseConnect
} = require('../db/mongoose.js');

let app = express();
app.use(bodyParser.json());




app.listen(3000, () => {
  console.log('listening on port 3000');
});
