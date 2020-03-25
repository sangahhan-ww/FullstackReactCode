const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// ^equivalent to the following thanks to destructuring
const { Schema } = mongoose;

// describe all the properties we will have in a user
const userSchema = new Schema({
    googleID: String,
});

// telling mongoose we want to create a new collection of users with this schema
// create if dne
mongoose.model('users', userSchema);
