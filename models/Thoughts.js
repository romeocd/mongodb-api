const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reactionSchema = require('./Reaction');

//Thought Schema
const thoughtSchema = new Schema({
    thoughtText: {type: String, required: true, minlegth: 1, maxlength: 280 },
    createdAt: { type: Data, default: Date.now },
    username: {type: String, required: true },
    reactions: [reactionSchema]
});

//Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = mongoose.model('Thought', thoughtSchema);