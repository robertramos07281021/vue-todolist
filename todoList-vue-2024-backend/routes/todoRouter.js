const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController')

router.post('/add',todoController.addTodo)
router.get('/todo',todoController.showTodo)
router.put('/update/:id',todoController.updateTodo)
router.delete('/delete/:id',todoController.deleteTodo)
router.get('/todo/:id',todoController.getTodo)

module.exports = router;