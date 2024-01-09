const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
const userSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] 
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

//Virtual friend count 
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = mongoose.model('User', userSchema);