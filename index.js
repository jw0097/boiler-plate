const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jwoo27:iq6160pw!!@cluster0.x3amc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)