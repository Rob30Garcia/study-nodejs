const express = require('express');

const app = express();

app.use(express.json());

const user = {
  id: '',
  name: '',
  username: '',
  todos: []
}; 


app.post('/users', (request, response) => {
  const { id, name, username} = request.body;

  user.id = id;
  user.name = name;
  user.username = username;

  return response.json({
    user: user
  })
})


app.listen(3333);
