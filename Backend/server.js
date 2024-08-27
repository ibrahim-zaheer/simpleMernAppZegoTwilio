const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user')
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes


// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-simple-app').then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  
// Basic Route
app.get('/', (req, res) => {
  res.send('Hello, World 123!');
});

app.get('/add-user', async (req, res) => {
  const newUser = new User({ name: 'John Doe', email: 'johndoe@example.com' });
  try {
    const savedUser = await newUser.save();
    res.send(`User saved: ${savedUser}`);
  } catch (err) {
    res.status(400).send('Error saving user: ' + err.message);
  }
});
// Add this route in your server.js file

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users); // Send the users as a JSON response
  } catch (err) {
    res.status(400).send('Error fetching users: ' + err.message);
  }
});
// Add this route to your server.js file

// Route to add a new user
app.post('/add-user', async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).send('Error saving user: ' + err.message);
  }
});

// Route to get a user by email
app.get('/user/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send('Error fetching user: ' + err.message);
  }
});








// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
