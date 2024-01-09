const express = require('express');
const User = require('../models/User');
const Thought = require('../models/Thoughts')
const router = express.Router();

//GET all users
router.get('/', async (req,res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



