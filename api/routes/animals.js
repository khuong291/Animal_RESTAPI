const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Animal = require('../models/animal');

router.get('/', (req, res, next) => {
  Animal.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/', (req, res, next) => {
  const animal = new Animal({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
  });
  animal
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Handling POST requests to /animals',
        createdAnimal: result,
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get('/:animalId', (req, res, next) => {
  const id = req.params.animalId;
  Animal.findById(id)
    .exec()
    .then(docs => {
      if (doc) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: 'No valid entry found for provided ID',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
});

router.patch('/:animalId', (req, res, next) => {
  const id = req.params.animalId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Animal.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result =>
      res.status(200).json({
        result,
      })
    )
    .catch(err =>
      res.status(500).json({
        error: err,
      })
    );
});

router.delete('/:animalId', (req, res, next) => {
  const id = req.params.animalId;
  Animal.remove({
    _id: id,
  })
    .exec()
    .then(res => {
      res.status(200).json(res);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
