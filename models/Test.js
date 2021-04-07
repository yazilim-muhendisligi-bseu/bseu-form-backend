const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TestSchema = mongoose.Schema({
    title: { type: String },
    category: { type: Object },
    questions: { type: Array }
})

module.exports = mongoose.model("Test", TestSchema)