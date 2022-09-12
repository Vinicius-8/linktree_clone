import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please add an name']
    },
    email :{
        type: String,
        required: [true, 'please add an email'],
        unique: true
    },
    password :{
        type: String,
        required: [true, 'please add an password']
    },
}, {
    timestamps: true
})

module.exports =  mongoose.models.User || mongoose.model('User', userSchema) 