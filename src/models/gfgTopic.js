const mongoose = require('mongoose');

const gfgTopicSchema = new mongoose.Schema({

    topic: {
        type: String,
        required: 'Topic is required',
    },

}, {timestamps: true});


module.exports = mongoose.model('gfgTopics', gfgTopicSchema);