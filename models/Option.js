const mongoose = require('mongoose');


const OptionSchema = mongoose.Schema({
    title: { type: String }
})

module.exports = mongoose.model("Option", OptionSchema)