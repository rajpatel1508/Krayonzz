const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    title: { type: String, required: true },
    questions: { type: Array, required: true },
});

module.exports = mongoose.model('Quiz', quizSchema);