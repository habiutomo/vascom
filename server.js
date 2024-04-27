const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];

// Create user
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Read user by id
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === userId);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(user);
  }
});

// Update user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const index = users.findIndex(user => user.id === userId);
  if (index === -1) {
    res.status(404).send('User not found');
  } else {
    users[index] = { ...users[index], ...updatedUser };
    res.json(users[index]);
  }
});

// Delete user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const index = users.findIndex(user => user.id === userId);
  if (index === -1) {
    res.status(404).send('User not found');
  } else {
    users.splice(index, 1);
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
