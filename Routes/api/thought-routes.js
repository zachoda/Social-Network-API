const router = require('express').Router();
const {getAllThoughts, newThought, getThoughtById, updateThought, deleteThought, addReaction, deleteReaction} = require('../../Controllers/thought-controller');

router.route('/')
.get(getAllThoughts)

router.route('/:userId')
.post(newThought)

router.route('/:thoughtId')
.get(getThoughtById)

router.route('/:userId/:thoughtId')
.put(updateThought)
.delete(deleteThought)

router.route('/:userId/:thoughtId/:reactions')
.post(addReaction)
.delete(deleteReaction)