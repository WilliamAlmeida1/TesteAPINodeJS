// server/models/User.js

const mongoose = require('mongoose');

const User = mongoose.mongoose.model('User', {
    name: String,
    email: String,
    password: String,
});

module.exports = User;