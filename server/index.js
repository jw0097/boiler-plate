const mongoose = require('mongoose')

const config = require('./config/key')

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

const express = require('express')
const app = express()

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { User } = require('./models/User.js');
const { auth } = require('./middleware/auth.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', function (req, res) {
  res.send('Hello World...')
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      registerSuccess: true
    })
  })
});

app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({
      loginSuccess: false,
      message: "아이디 또는 비밀번호가 잘못 입력 되었습니다."
    })
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({
        loginSuccess: false,
        message: "아이디 또는 비밀번호가 잘못 입력 되었습니다."
      })
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id
        })
      })
    })
  })
});

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  })
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  })
})

app.get('/api/hello', (req, res) => {
  res.send("hello")
})


app.listen(5000)