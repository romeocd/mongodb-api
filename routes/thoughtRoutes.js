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

//POST to create a new thought
router.post('/', async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;
        const newThought = new Thought({ thoughtText, username });
        await newThought.save();

        await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });

        res.status(201).json(newThought);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//DELETE to remove a thought by _id
router.delete('/:id', async (req,res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        //Remove thought ID from user's thoughts array

        await User.updateMany(
            { thoughts: req.params.id },
            { $pull: { thoughts: req.params.id } }
        );

        //Delete the thought
        await Thought.findByIdAndDelete(req.params.id);
        res.json({ message: 'Thought and reference to it deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//POST to create a reaction
router.post('/:thoughtId/reactions', async (req,res) => {
    try {
        const { reactionBody, username } = req.body;
        const reaction = { reactionBody, username, createdAt: new Date() };

        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: reaction } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(thought);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//PUT to update a thought by its _id
router.put('/:id', async(req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(updatedThought);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//DELETE to remove a reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;

        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;