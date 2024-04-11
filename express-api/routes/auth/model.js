import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

export const User = mongoose.model('User', UserSchema)