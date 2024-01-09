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


