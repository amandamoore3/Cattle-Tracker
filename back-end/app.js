'use strict'
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const {
  mongooseConnect
} = require('../db/mongoose.js');

const {
  client
} = require('mongodb');

const {
  Breeding
} = require('../models/breeding.js');

const {
  Cow
} = require('../models/cow.js');


const {
  Health
} = require('../models/health.js');

// const {
//   Outcome
// } = require('../models/outcomes.js');

const {
  Pasture
} = require('../models/pastures.js');

const {
  PregCheck
} = require('../models/preg-check.js');



let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/static'));



//  GET ALL DATA FROM CATTLE TABLE
app.get('/cattle', (req, res) => {
  Cow.find()
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
//  GET ALL DATA FROM CATTLE TABLE

// // GET INDIVIDUAL FROM CATTLE TABLE
// app.get('/cattle/:id', (req, res) => {
//   Cow.findById(req.params.id)
//     .then((docs) => {
//       res.send(docs)
//
//     }, (err) => {
//       res.status(400).send(err);
//     });
// });
// // GET INDIVIDUAL FROM CATTLE TABLE

//  GET INDIVIDUAL FROM CATTLE TABLE
app.get('/cattle/:id', (req, res) => {
  Cow.findOne({
      tag_id: req.params.id
    })
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
//  GET INDIVIDUAL FROM CATTLE TABLE

//  POST TO CATTLE TABLE
app.post('/cattle', (req, res) => {
  let newCow = new Cow({
    tag_id: req.body.tag_id,
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
//  POST TO CATTLE TABLE

//DELETE ANIMAL BY ID
app.delete('/cattle/:id', (req, res) => {
  // console.log("deleterequest" + JSON.stringify(req.params));
  Cow.findOneAndRemove({
      tag_id: req.params.id
    })
    .then((docs) => {
      if (!docs) {
        res.send('Nothing found');
        return;
      }
      res.send(docs);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
////DELETE ANIMAL BY ID

//  UPDATE ANIMAL BY TAG ID
app.patch('/cattle/:id', (req, res) => {
  Cow.findOneAndUpdate({
      tag_id: req.params.id

    }, {
      $set: req.body
    }, {
      new: true
    })
    .then((response) => {
      if (!response) {
        res.send('Nothing found');
        return;
      }
      res.send(response);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
//  UPDATE ANIMAL BY TAG ID

//  GET ALL DATA FROM BREEDING TABLE
app.get('/breeding', (req, res) => {
  Breeding.find()
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
//  GET ALL DATA FROM BREEDING TABLE

//  GET INDIVIDUAL COW BREEDING DATA BY TAG-ID
app.get('/breeding/:id', (req, res) => {
  Breeding.find({
      tag_id: req.params.id
    })
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
//  GET INDIVIDUAL COW BREEDING DATA BY TAG-ID

//  GET INDIVIDUAL BREEDING EVENT DATA BY OBJECT ID
app.get('/breedingevent/:id', (req, res) => {
  Breeding.findById(req.params.id)
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
//  GET INDIVIDUAL COW BREEDING DATA BY OBJECT ID

//  POST TO BREEDING TABLE
app.post('/breeding', (req, res) => {
  let newBreeding = new Breeding({
    tag_id: req.body.tag_id,
    date: req.body.date,
    method: req.body.method,
    bull: req.body.bull,
    technician: req.body.technician,
    comments: req.body.comments
  });
  newBreeding.save()
    .then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});
//  POST TO BREEDING TABLE

//DELETE BREEDING DOCUMENT BY ID
app.delete('/breedingevent/:id', (req, res) => {
  console.log("deleterequest" + JSON.stringify(req.params));
  Breeding.findByIdAndRemove(req.params.id)
    .then((docs) => {
      if (!docs) {
        res.send('Nothing found');
        return;
      }
      res.send(docs);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
////DELETE BREEDING DOCUMENT BY ID

//UPDATE BREEDING DOCUMENT BY ID
app.patch('/breedingevent/:id', (req, res) => {
  Breeding.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: req.body
    }, {
      new: true
    })
    .then((response) => {
      if (!response) {
        res.send('Nothing found');
        return;
      }
      res.send(response);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
//UPDATE BREEDING DOCUMENT BY ID

//  GET ALL DATA FROM HEALTH TABLE
app.get('/health', (req, res) => {
  Health.find()
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
//  GET ALL DATA FROM HEALTH TABLE

//  GET INDIVIDUAL COW HEALTH DATA
app.get('/health/:id', (req, res) => {
  Health.find({
      tag_id: req.params.id
    })
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
//  GET INDIVIDUAL COW HEALTH DATA

//  GET INDIVIDUAL HEALTH EVENT DATA BY OBJECT ID
app.get('/healthevent/:id', (req, res) => {
  Health.findById(req.params.id)
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
//  GET INDIVIDUAL COW HEALTH DATA BY OBJECT ID

//  POST TO HEALTH TABLE
app.post('/health', (req, res) => {
  let newHealth = new Health({
    tag_id: req.body.tag_id,
    treatmentDate: req.body.treatmentDate,
    medication: req.body.medication,
    dosage: req.body.dosage,
    booster: req.body.booster,
    diagnosis: req.body.diagnosis,
    comments: req.body.comments
  });
  newHealth.save()
    .then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});
//  POST TO HEALTH TABLE

//DELETE HEALTH DOCUMENT BY ID
app.delete('/healthevent/:id', (req, res) => {
  console.log("deleterequest" + JSON.stringify(req.params));
  Health.findByIdAndRemove(req.params.id)
    .then((docs) => {
      if (!docs) {
        res.send('Nothing found');
        return;
      }
      res.send(docs);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
////DELETE HEALTH DOCUMENT BY ID

//UPDATE HEALTH DOCUMENT BY ID
app.patch('/healthevent/:id', (req, res) => {
  Health.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: req.body
    }, {
      new: true
    })
    .then((response) => {
      if (!response) {
        res.send('Nothing found');
        return;
      }
      res.send(response);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
//UPDATE HEALTH DOCUMENT BY ID

// GET ALL DATA FROM OUTCOMES TABLE
app.get('/outcomes', (req, res) => {
  Outcome.find()
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
// GET ALL DATA FROM OUTCOMES TABLE

// POST TO OUTCOMES TABLE
app.post('/outcomes', (req, res) => {
  let newOutcome = new Outcome({
    tag_id: req.body.tag_id,
    date: req.body.date,
    status: req.body.status,
    weight: req.body.weight,
    causeOfDeath: req.body.causeOfDeath,
    comments: req.body.comments,
    dateCreated: req.body.dateCreated
  });
  newOutcome.save()
    .then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});
// POST TO OUTCOMES TABLE

//DELETE OUTCOME DOCUMENT BY ID
app.delete('/outcomes/:id', (req, res) => {
  console.log("deleterequest" + JSON.stringify(req.params));
  Outcome.findByIdAndRemove(req.params.id)
    .then((docs) => {
      if (!docs) {
        res.send('Nothing found');
        return;
      }
      res.send(docs);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
////DELETE OUTCOME DOCUMENT BY ID

//UPDATE OUTCOME DOCUMENT BY ID
app.patch('/outcomes/:id', (req, res) => {
  Outcome.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: req.body
    }, {
      new: true
    })
    .then((response) => {
      if (!response) {
        res.send('Nothing found');
        return;
      }
      res.send(response);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
//UPDATE OUTCOME DOCUMENT BY ID

// GET ALL DATA FROM PASTURES TABLE
app.get('/pastures', (req, res) => {
  Pasture.find()
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
// GET ALL DATA FROM PASTURES TABLE

// POST TO PASTURES TABLE
app.post('/pastures', (req, res) => {
  let newPasture = new Pasture({
    name: req.body.name,
    comments: req.body.comments
  });
  newPasture.save()
    .then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});
// POST TO PASTURES TABLE

//DELETE PASTURE DOCUMENT BY ID
app.delete('/pastures/:id', (req, res) => {
  console.log("deleterequest" + JSON.stringify(req.params));
  Pasture.findByIdAndRemove(req.params.id)
    .then((docs) => {
      if (!docs) {
        res.send('Nothing found');
        return;
      }
      res.send(docs);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
////DELETE PASTURE DOCUMENT BY ID

//UPDATE PASTURE DOCUMENT BY ID
app.patch('/pastures/:id', (req, res) => {
  Pasture.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: req.body
    }, {
      new: true
    })
    .then((response) => {
      if (!response) {
        res.send('Nothing found');
        return;
      }
      res.send(response);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
//UPDATE PASTURE DOCUMENT BY ID

//  GET ALL DATA FROM PREG-CHECK TABLE
app.get('/pregnancy', (req, res) => {
  PregCheck.find()
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
//  GET ALL DATA FROM PREG-CHECK TABLE

//  GET INDIVIDUAL COW PREG-CHECK DATA
app.get('/pregnancy/:id', (req, res) => {
  PregCheck.find({
      tag_id: req.params.id
    })
    .then((docs) => {
      res.send(docs)

    }, (err) => {
      res.status(400).send(err);
    });
});
//  GET INDIVIDUAL COW PREG-CHECK DATA

//  POST TO PREG-CHECK TABLE
app.post('/pregnancy', (req, res) => {
  let newPregCheck = new PregCheck({
    tag_id: req.body.tag_id,
    date: req.body.date,
    method: req.body.method,
    result: req.body.result,
    comments: req.body.comments
  });
  newPregCheck.save()
    .then((doc) => {
      res.send(doc);
    }, (err) => {
      res.status(400).send(err);
    });
});
//  POST TO PREG-CHECK TABLE

//DELETE PREG-CHECK DOCUMENT BY ID
app.delete('/pregnancy/:id', (req, res) => {
  console.log("deleterequest" + JSON.stringify(req.params));
  PregCheck.findByIdAndRemove(req.params.id)
    .then((docs) => {
      if (!docs) {
        res.send('Nothing found');
        return;
      }
      res.send(docs);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
////DELETE PREG-CHECK DOCUMENT BY ID

//UPDATE PREG-CHECK DOCUMENT BY ID
app.patch('/pregnancy/:id', (req, res) => {
  PregCheck.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: req.body
    }, {
      new: true
    })
    .then((response) => {
      if (!response) {
        res.send('Nothing found');
        return;
      }
      res.send(response);
    }, (err) => {
      res.status(400).send(err.message);
    });
});
//UPDATE PREG-CHECK DOCUMENT BY ID


// //  GET ALL DATA FROM OUTCOMES TABLE
// app.get('/outcomes', (req, res) => {
//   Outcomes.find()
//     .then((docs) => {
//       res.send(docs)
//
//     }, (err) => {
//       res.status(400).send(err);
//     });
// });
// //  GET ALL DATA FROM OUTCOMES TABLE

// //  POST TO OUTCOMES TABLE
// app.post('/outcomes', (req, res) => {
//   let newOutcomes = new Outcomes({
//     tag_id: req.body.tag_id,
//     date: req.body.date,
//     status: req.body.status,
//     weight: req.body.weight,
//     causeOfDeath: req.body.causeOfDeath,
//     comments: req.body.comments
//   });
//   newOutcomes.save()
//     .then((doc) => {
//       res.send(doc);
//     }, (err) => {
//       res.status(400).send(err);
//     });
// });
// //  POST TO OUTCOMES TABLE
//
// //  DELETE OUTCOMES DOCUMENT BY ID
// app.delete('/outcomes/:id', (req, res) => {
//   console.log("deleterequest" + JSON.stringify(req.params));
//   Outcomes.findByIdAndRemove(req.params.id)
//     .then((docs) => {
//       if (!docs) {
//         res.send('Nothing found');
//         return;
//       }
//       res.send(docs);
//     }, (err) => {
//       res.status(400).send(err.message);
//     });
// });
// ////  DELETE OUTCOMES DOCUMENT BY ID
//
// //  UPDATE OUTCOMES DOCUMENT BY ID
// app.patch('/outcomes/:id', (req, res) => {
//   Outcomes.findOneAndUpdate({
//       _id: req.params.id
//     }, {
//       $set: req.body
//     }, {
//       new: true
//     })
//     .then((response) => {
//       if (!response) {
//         res.send('Nothing found');
//         return;
//       }
//       res.send(response);
//     }, (err) => {
//       res.status(400).send(err.message);
//     });
// });
//   UPDATE OUTCOMES DOCUMENT BY ID

app.listen(3000, () => {
  console.log('listening on port 3000');
});