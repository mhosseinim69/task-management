const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);