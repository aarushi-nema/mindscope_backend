const express = require('express');
const port = 3000;

const app = express();
const bodyParser = require('body-parser');

require('./db');
require('./model/User');
require('./model/LearningContent');
require('./model/Journal');
require('./model/UserBiasProfile');
require('./model/Quiz');

const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const journalRoutes = require('./routes/journalRoutes');
const userBiasProfileRoutes = require('./routes/userBiasProfileRoutes');
const quizRoutes = require('./routes/quizRoutes');
const requiredToken = require('./middleware/AuthTokenRequired');


app.use(bodyParser.json());
app.use(authRoutes);
app.use(contentRoutes);
app.use(journalRoutes);
app.use(userBiasProfileRoutes);
app.use(quizRoutes);

app.get('/', requiredToken, (req,res)=>{
    console.log(req.user);
    res.send(req.user)
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
