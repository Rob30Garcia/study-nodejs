const express = require('express');
const { v4 } = require('uuid');

const app = express();

app.use(express.json());

const users = [];

const user = {
  id: '',
  name: '',
  username: '',
  todos: []
}; 

const todo = {
  id: '',
  title: '',
  done: false,
  deadline: '',
  create_at: '',
}


app.post('/users', (request, response) => {
  const { id, name, username} = request.body;

  user.id = v4();
  user.name = name;
  user.username = username;

  users.push(user);

  return response.json({
    user: user
  })
});

app.get('/todos', (request, response) => {
  const {username} = request.body;

  if(!users.find(element => element.username === username)) {
    return response.status(401).json({ error: "Username not found!"});
  }

  return response.json({
    todos: user.todos,
  })
});

app.post('/todos', (request, response) => {
  const { username } = request.headers;
  const { title, deadline } = request.body;
  
  const userFind = users.find(element => element.username === username);

  if(!userFind) {
    return response.status(401).json({ error: "Username not found!"});
  }
  
  todo.id = v4();
  todo.title = title;
  todo.deadline = new Date(deadline);
  todo.create_at = new Date();

  const index = users.indexOf(userFind);

  users[index].todos.push(todo);

  return response.json({
    todo: todo
  });
});

app.listen(3333);
