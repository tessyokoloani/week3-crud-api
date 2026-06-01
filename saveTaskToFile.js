const fs = require('fs');
const path = require('path');

const todosFilePath = path.join(__dirname, 'data', 'todos.js');

function saveTodosToFile(todos) {

  const fileContent = `
const todos = ${JSON.stringify(todos, null, 2)};

module.exports = todos;
`;

  fs.writeFileSync(todosFilePath, fileContent);

}

module.exports = saveTodosToFile;