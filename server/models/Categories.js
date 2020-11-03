const mongoose = require('mongoose');
const Articles = require('../models/Articles.js');

const CategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Articles' }] //For one to many rellations
})

module.exports = mongoose.model('Categories', CategoriesSchema);