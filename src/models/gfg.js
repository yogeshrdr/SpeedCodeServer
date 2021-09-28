const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const gfgSchema = new mongoose.Schema({

    title: {
        type: String,
        required: 'title is required',
    },

    maintitle: {
        type: String,
        required: 'maintitle is required',
    },

    link : {
        type: String,
        required: 'link is required',
    },

    topic:{
        type: String,
        required: 'topic is required',
    },

    type:{
        type: String,
        required:'type is required',
    }

}, {timestamps: true});


gfgSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('gfgs', gfgSchema);