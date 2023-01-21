const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require('dotenv');
const quizRoutes = require('./routes/quiz');

const app = express();
app.use(bodyParser.json());
env.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO, { useNewUrlParser: true }).then(() => {
    console.log("Database connected");
});

// Use the quiz routes
app.use('/api', quizRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});