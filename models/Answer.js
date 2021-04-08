const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
    username: { type: String },
    answers: { type: Object }
})

module.exports = mongoose.model("Answer", AnswerSchema)