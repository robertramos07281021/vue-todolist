const Todo = require('../model/todo')

exports.addTodo = async( req, res ) => {
  const {name} = req.body

  if(!name) {
    return res.status(400).json({message: 'All fileds are required'})
  }
  try {
    const todo = await Todo.create({ name })
    res.status(200).json({success: 'Post created',todo})
  } catch (error) {
    return res.status(500).json({error : error.message})
  }
}

exports.showTodo = async(req, res) => {
  try {
    const todos = await Todo.find()
    res.status(200).json({todos})
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
}

exports.updateTodo = async(req, res) => {
  const {done, name} = req.body;
  const {id} = req.params

  console.log(id)
  console.log(done)
  console.log(name)
  if(!name) {
    return res.status(400).json({message: 'All fileds are required'})
  }

  const todo = await Todo.findById(id);
  if(!todo) {
    return res.status(400).json({error: 'Todo not found'})
  }

  try {
    await todo.updateOne({done, name})
    res.status(200).json({success : 'Post updated', todo})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

exports.deleteTodo = async(req, res) => {
  const {id} = req.params;
  const todo = await Todo.findById(id);
  if(!todo) {
    return res.status(400).json({error: 'Todo not found'})
  }
  try {
    await todo.deleteOne()
    res.status(200).json({success :'Post deleted'})
  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
}

exports.getTodo = async(req, res) => {
  const {id} = req.params;
  const todo = await Todo.findById(id);
  return res.status(200).json({todo});
}