const mongoose = require('mongoose');


const QuestionSchema = mongoose.Schema({
    title: { type: String },
    options: {type: Array},
    correctOption: {type: Object}
})

module.exports = mongoose.model("Question", QuestionSchema)