const Quiz = require('../models/quiz');

exports.getAllQuiz = (req, res) => {
    Quiz.find()
        .then(quizzes => {
            res.status(200).json({
                message: 'Quizzes retrieved successfully',
                quizzes: quizzes
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching quizzes failed',
                error: error
            });
        });
}

exports.getQuiz = (req, res) => {
    Quiz.findById(req.params.id)
        .then(quiz => {
            if (!quiz) {
                return res.status(404).json({
                    message: 'Quiz not found'
                });
            }
            res.status(200).json({
                message: 'Quiz retrieved successfully',
                quiz: quiz
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching quiz failed',
                error: error
            });
        });
}

exports.createQuiz = (req, res) => {
    const quiz = new Quiz({
        title: req.body.title,
        questions: req.body.questions
    });
    quiz.save()
        .then(createdQuiz => {
            res.status(201).json({
                message: 'Quiz added successfully',
                quizId: createdQuiz._id
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Creating quiz failed',
                error: error
            });
        });
}

exports.participateQuiz = (req, res) => {
    Quiz.findById(req.params.id)
        .then(quiz => {
            if (!quiz) {
                return res.status(404).json({
                    message: 'Quiz not found'
                });
            }
            let totalQuestions = quiz.questions.length;
            let correctAnswers = 0;
            for (let i = 0; i < totalQuestions; i++) {
                if (quiz.questions[i].answer === req.body.answers[i]) {
                    correctAnswers++;
                }
            }
            let percentageCorrect = (correctAnswers / totalQuestions) * 100;
            res.status(200).json({
                message: 'Quiz participation successful',
                correctAnswers: correctAnswers,
                percentageCorrect: percentageCorrect
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Participating in quiz failed',
                error: error
            });
        });
}