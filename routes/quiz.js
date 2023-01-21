const express = require('express');
const { getAllQuiz, getQuiz, createQuiz, participateQuiz } = require('../controller');
const { checkQuizData } = require('../middlewares');
const Quiz = require('../models/quiz');

const router = express.Router();

// Get all quizzes
router.get('/getallquiz', getAllQuiz);

// Get a single quiz
router.get('/getquiz/:id', getQuiz);

// Create a quiz
router.post('/createquiz',checkQuizData, createQuiz);

// Participate in quiz
router.post('/quiz/:id/participate', participateQuiz);

module.exports = router;