const mongoose = require('mongoose');


const CategorySchema = mongoose.Schema({
    title: { type: String }
})

module.exports = mongoose.model("Category", CategorySchema)