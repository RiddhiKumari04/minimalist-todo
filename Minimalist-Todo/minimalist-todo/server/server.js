const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const tasksRouter = require('./routes/tasks');
const app = express();
app.use(cors());
app.use(express.json());
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/minimalist_todo';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));
app.use('/api/tasks', tasksRouter);
app.get('/', (req,res)=> res.send('Minimalist To-do API'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
