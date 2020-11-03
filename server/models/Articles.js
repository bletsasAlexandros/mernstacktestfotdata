const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    title: {
        type:String,
        required: true,
        unique: true
    },
    description: {
        type:String,
        required:false
    },
    content: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Articles',ArticleSchema);
