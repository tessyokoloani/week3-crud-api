require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const todos = require("./data/todos")
const {validatePost, validateUpdate} = require('./validation/validation')
const saveTasksToFile = require('./saveTaskToFile');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running'
  });
});

//get all todos
app.get('/todos', (req, res) => {

  res.status(200).json(todos);

});

//get single task
app.get('/todos/:id', (req, res) => {

  const id = parseInt(req.params.id);

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.status(200).json(todo);

})

// Create a task

app.post('/todos', validatePost, (req, res)=>{
   let {title, description, status} = req.body;
   // trim title and description
   title = title.trim();
   description = description.trim();
   // create new id for entry which should be todos.length + 1
   const id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

   // create new object for title, description and status
   const newTodo = {
    id:id,
    title:title,
    description:description,
    status:status
   }

   todos.push(newTodo)
   
   // push object into todos.js (might create a helper function for that)
   saveTasksToFile(todos)
   // Return response status 201 showing new todos added
   res.status(201).json({'newToDo':newTodo, message:"New ToDo Entry Created Successfully"})
})


//Update all data/inputs in a task

app.put('/todos/:id', validateUpdate, (req, res) => {

  const id = parseInt(req.params.id);

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Task not found"
    });
  }
  try {
    
      const { title, description, status } = req.body;
    
      if (title !== undefined) todo.title = title;
      if (description !== undefined) todo.description = description;
      if (status !== undefined) todo.status = status;
    
      saveTasksToFile(todos)
    
      res.status(200).json({
        message: "Task updated successfully",
        todo
      });
  } catch (error) {
      console.log({message:error.message})
      res.json({message:`catch error - ${error.message}`})


  }

});


// update a specific data in task
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Update only the fields that were provided in the request body
  if (req.body.title !== undefined) todo.title = req.body.title;
  if (req.body.description !== undefined) todo.description = req.body.description;
  todo.status = req.body.status;

  saveTasksToFile(todos)

  // Respond with the updated task
  res.status(200).json({ message: "Task updated successfully", todo: todo });
});


//Delete Todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const initialLength = todos.length
    
    const newTodos = todos.filter(t => t.id !== id);
    if(newTodos.length === initialLength){
        res.json({message:"ToDo not deleted"})
    }
    // Reassign all IDs sequentially
    newTodos.forEach((todo, index) => {
        todo.id = index + 1;  // IDs become 1, 2, 3...
    })
    saveTasksToFile(newTodos);
    res.status(204).json({message:"ToDo deleted successfully"})
})


const PORT = 3009;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
