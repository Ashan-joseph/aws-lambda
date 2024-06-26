const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Text field is required']
    },

    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: true
    },

    username: {
        type: String,
        required: [true, 'Text field is required']
    },

    password: {
        type: String,
        required: [true, 'Password field is required'],
    },
},{timestamps: true})

module.exports = mongoose.model('User',userSchema)