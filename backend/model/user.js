const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 4
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
    dob:{
        type: String,
        required: true,
        min: 2
    }
});

module.exports = mongoose.model('user', userSchema);