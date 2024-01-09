const express = require('express');
const User = require('../models/User');
const Thought = require('../models/Thoughts')
const router = express.Router();

//GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get a single user by _id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found '});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

