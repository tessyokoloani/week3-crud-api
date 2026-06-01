# Todo List API

A RESTful API for managing todo tasks with persistent storage. Built with Node.js and Express.

---

## Features

* ✅ Create new todo tasks
* 📋 Read all todos
* 🔄 Update existing todos
* 🗑️ Delete todos
* 💾 Persistent storage using JSON file
* 🆔 Automatic unique ID generation

---

## Tech Stack

* Node.js
* Express.js
* File System (`fs`) for data persistence

---

## Installation

### Prerequisites

* Node.js (v12 or higher)
* npm (Node Package Manager)

### Steps

#### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd todo-api
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Start the Server

```bash
npm start
```

#### For Development (Auto Restart)

```bash
npm run dev
```

---

## API Endpoints

### Base URL

```text
http://localhost:3000
```

### Available Endpoints

| Method | Endpoint     | Description               |
| ------ | ------------ | ------------------------- |
| GET    | `/todos`     | Get all todos             |
| GET    | `/todos/:id` | Get a specific todo by ID |
| POST   | `/todos`     | Create a new todo         |
| PUT    | `/todos/:id` | Update an existing todo   |
| PATCH  | `/todos/:id` | Partially update a todo   |
| DELETE | `/todos/:id` | Delete a todo             |

---

# Request & Response Examples

## 1. Get All Todos

### Request

```http
GET /todos
```

### Response

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "Complete project proposal",
      "description": "Write and finalize the Q3 project proposal",
      "status": "completed"
    },
    {
      "id": 2,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread, vegetables",
      "status": "pending"
    }
  ]
}
```

---

## 2. Get Single Todo

### Request

```http
GET /todos/1
```

### Response (Success)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project proposal",
    "description": "Write and finalize the Q3 project proposal",
    "status": "completed"
  }
}
```

### Response (Not Found)

```json
{
  "success": false,
  "message": "Todo with id 1 not found"
}
```

---

## 3. Create New Todo

### Request

```http
POST /todos
Content-Type: application/json

{
  "title": "Learn Express.js",
  "description": "Complete Express.js tutorial and build a REST API",
  "status": "in-progress"
}
```

### Response

```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": 5,
    "title": "Learn Express.js",
    "description": "Complete Express.js tutorial and build a REST API",
    "status": "in-progress"
  }
}
```

---

## 4. Update Todo (Full Update)

### Request

```http
PUT /todos/1
Content-Type: application/json

{
  "title": "Complete updated project proposal",
  "description": "Updated description for Q3 proposal",
  "status": "completed"
}
```

### Response

```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": 1,
    "title": "Complete updated project proposal",
    "description": "Updated description for Q3 proposal",
    "status": "completed"
  }
}
```

---

## 5. Partial Update Todo

### Request

```http
PATCH /todos/1
Content-Type: application/json

{
  "status": "in-progress"
}
```

### Response

```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": 1,
    "title": "Complete project proposal",
    "description": "Write and finalize the Q3 project proposal",
    "status": "in-progress"
  }
}
```

---

## 6. Delete Todo

### Request

```http
DELETE /todos/1
```

### Response

```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

---

# Data Schema

## Todo Object

| Field       | Type   | Required | Description                        |
| ----------- | ------ | -------- | ---------------------------------- |
| id          | Number | Yes      | Unique identifier (auto-generated) |
| title       | String | Yes      | Todo title (max 100 chars)         |
| description | String | Yes      | Detailed description               |
| status      | String | Yes      | Current status                     |

### Allowed Status Values

* `pending` — Task not started yet
* `in-progress` — Task is being worked on
* `completed` — Task is finished
* `cancelled` — Task was abandoned

---

# Error Handling

## Common Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Title and description are required"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Todo with id 5 not found"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

# Validation Rules

* Title cannot be empty
* Description cannot be empty
* Title and description are automatically trimmed
* Invalid status values are rejected
* Maximum title length: 100 characters
* Maximum description length: 500 characters

---

# Project Structure

```text
todo-api/
├── data/
│   └── todos.js
├── src/
├── middleware/
│   ├── validation.js
│── saveTaskToFile.js
├── todos.js
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
TODOS_FILE_PATH=./data/todos.json
```

---

# Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --grep "Todo API"

# Run with coverage
npm run test:coverage
```

---

# Example Usage with cURL

### Get All Todos

```bash
curl http://localhost:3000/todos
```

### Create a Todo

```bash
curl -X POST http://localhost:3000/todos \
-H "Content-Type: application/json" \
-d '{"title":"Learn cURL","description":"Practice API calls with cURL","status":"pending"}'
```

### Update a Todo

```bash
curl -X PATCH http://localhost:3000/todos/1 \
-H "Content-Type: application/json" \
-d '{"status":"completed"}'
```

### Delete a Todo

```bash
curl -X DELETE http://localhost:3000/todos/1
```

---

# Example Usage with Fetch API

```javascript
// Get all todos
fetch('http://localhost:3000/todos')
  .then(res => res.json())
  .then(data => console.log(data));

// Create new todo
fetch('http://localhost:3000/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Task',
    description: 'Task description',
    status: 'pending'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

# Core Module: todos.js

## Functions

### `todos.js`

Loads todos from the exported JSON file during startup.

### `saveTasksToFile(tasks)`

Persists todos to the JSON file.

**Returns**

* `true` on success
* `false` on failure

### `addTodo(todo)`

Creates a new todo with an auto-generated ID.

**Parameters**

```javascript
{
  title,
  description,
  status
}
```

### `deleteTodo(id)`

Deletes a todo by ID.

**Parameters**

```javascript
id: Number
```

### `updateTodo(id, updates)`

Updates an existing todo.

**Parameters**

```javascript
id: Number
updates: Object
```

---

## Data Persistence Format

```json
[
  {
    "id": 1,
    "title": "Example Todo",
    "description": "This is an example",
    "status": "pending"
  }
]
```

---

# Performance Considerations

* File-based storage suitable for up to ~10,000 todos
* In-memory operations provide fast reads and writes
* O(1) ID generation using a counter pattern
* O(n) lookup and filter operations

---

# Limitations

* Not suitable for multi-server deployments
* No authentication or authorization
* No database indexing
* Concurrent file writes may cause conflicts

---

# Future Improvements

* JWT Authentication
* MongoDB/PostgreSQL Integration
* Pagination & Filtering
* Due Dates & Reminders
* Categories & Tags
* Search Functionality
* Unit & Integration Tests
* Rate Limiting
* Request Logging
* WebSocket Real-Time Updates

---

# Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes

```bash
git commit -m "Add some AmazingFeature"
```

4. Push to GitHub

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

# License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

# Support

For issues, questions, or contributions:

* Open a GitHub Issue
* Contact the project maintainer

---

# Acknowledgments

* Express.js Documentation
* Node.js File System API
* REST API Best Practices

---

# Version History

## v1.0.0

* Initial Release
* CRUD Operations
* File-Based Persistence
* Auto-Increment ID Generation

---

Made with ❤️ for learning and building better APIs.
