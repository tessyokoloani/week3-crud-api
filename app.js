const express = require('express');
const {validatePost, validateUpdate} = require('./middleware/validation')
const app = express();
app.use(express.json()); // Parse JSON bodies

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
];

// GET All – Read
app.get('/todos', (req, res) => {
  res.status(200).json(todos); // Send array as JSON
});

//GET Single - Read
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

//GET only active reads
app.get('/todos/active', (req, res) => {
  const activeTodos = todos.find(t => t.status !== "completed");
  if (!activeTodos) {
    return res.status(404).json({
      message: "You have no active tasks"
    });
  }
  res.status(200).json({"All active todos":activeTodos});
})


// POST New – Create
app.post('/todos', (req, res) => {
  console.log(req.body)
  const lastId = todos.length;
  console.log(lastId)
  if (!lastId){
    console.log(lastId)
    res.status(501).json(Error.message)

  }
  const newTodo = { id: lastId + 1, ...req.body }; // Auto-ID
  if (newTodo){
    todos.push(newTodo);
    console.log(todos)
    res.status(201).json(newTodo); // Echo back new Todo
  }else{
    res.status(404).json({"message":"New Todo not found"})
  }
});

// PATCH Update – Partial
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  Object.assign(todo, req.body); // Merge: e.g., {completed: true}
  res.status(200).json(todo);
});

// DELETE Remove
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: 'Not found' });
  // Reassign all IDs sequentially
  todos.forEach((todo, index) => {
      todo.id = index + 1;  // IDs become 1, 2, 3...
  })
  res.status(204).send(); // Silent success
});

app.get('/todos/completed', (req, res) => {
  const completed = todos.filter((t) => t.completed);
  res.json(completed); // Custom Read!
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error!' });
});

const PORT = 3002;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
