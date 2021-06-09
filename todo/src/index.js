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

app.listen(3333);
