const express = require('express');
const Thought = require('../models/Thought');
const User = require('../models/User');
const router = express.Router();

//GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//GET a single thought by _id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' })
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
