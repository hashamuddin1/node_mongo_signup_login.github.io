const express = require("express");
const mongoose = require('mongoose');

//creating schema of sign_up
const signup_schema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    usertype: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    }

})


//creating collection
const signup = new mongoose.model('signups', signup_schema)

//export collection
module.exports = { signup };