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

//GET a single user by _id
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

//POST a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//PUT to update a user by _id
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

//DELETE to remove a user 
router.delete('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //remove associated thoughts
        await Thought.deleteMany({ username: user.username });

        await user.remove();
        res.json({ message: 'User and associated thoughts deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//POST to add a new friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.friends.includes(req.params.friendId)) {
            user.friends.push(req.params.friendId);
            await user.save();
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});