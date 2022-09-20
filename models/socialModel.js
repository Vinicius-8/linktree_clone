import mongoose from 'mongoose';

const socialSchema = mongoose.Schema({
    social:{
        type: String,
        required: [true, 'please add an social']
    },
    link :{
        type: String,
        required: [true, 'please add an link'],
        unique: true
    }
}, {
    timestamps: true
})

module.exports =  mongoose.models.Social || mongoose.model('Social', socialSchema) 