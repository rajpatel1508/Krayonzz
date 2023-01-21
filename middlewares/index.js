exports.checkQuizData = (req, res, next) => {
    const title = req.body.title;
    const questions = req.body.questions;
    if (!title || !questions) {
        return res.status(400).json({
            message: 'Title and questions are required fields'
        });
    }
    if (typeof title !== 'string' || !Array.isArray(questions)) {
        return res.status(400).json({
            message: 'Title must be a string and questions must be an array'
        });
    }
    if (questions.length === 0) {
        return res.status(400).json({
            message: 'Quiz must have at least one question'
        });
    }
    for (let i = 0; i < questions.length; i++) {
        if (!questions[i].question || !questions[i].options || !questions[i].answer) {
            return res.status(400).json({
                message: 'All questions must have a question, options and answer'
            });
        }
    }
    next();
}
