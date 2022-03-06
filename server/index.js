const mongoose = require('mongoose')
const express = require('express')
const app = express()

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { User } = require('./models/User.js');
const { auth } = require('./middleware/auth.js');
const config = require('./config/key')

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));

app.get('/', function (req, res) {
  res.send('Hello World...')
});


app.listen(5000)