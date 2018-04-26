const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /animals'
    })
});

router.post('/', (req, res, next) => {
    const animal = {
        name: req.body.name,
        description: req.body.description
    }
    res.status(200).json({
        message: 'Handling POST requests to /animals',
        createdAnimal: animal
    })
});

router.get('/:animalId', (req, res, next) => {
    const id = req.params.animalId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discoverd the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'you passed an ID'
        })
    }
});

router.patch('/:animalId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated animal!'
    })
});

router.delete('/:animalId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted animal!'
    })
});

module.exports = router;