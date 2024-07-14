const express = require('express');
const app = express();
const todoRouter = require('./routes/todoRouter')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/todos')
  .then(()=> {
    console.log('Connection Open')
  })
  .catch(err => {
    console.log('Error: ', err)
  })

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('',todoRouter)

app.listen(5000, ()=> {
  console.log('The server is up on port 5000')
})