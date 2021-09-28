const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vedioSchema = new Schema({
    title : {
        type: String,
        required: true,
    },
    description :{
        type: String,
    },
    link:{
        type: String,
        required: true,
    },
    playlistId:{
        type: Schema.Types.ObjectId,
        ref: 'playlist'
    },
    author:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true})


const blog = mongoose.model('vedio', vedioSchema)

module.exports = blog;