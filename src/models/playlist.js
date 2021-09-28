const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    title : {
        type: 'string',
        required: true,
    },
    vedios: [{
        type: Schema.Types.ObjectId,
        ref: 'vedio'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true})


const blog = mongoose.model('playlist', playlistSchema)

module.exports = blog;