const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todo');
const corsMiddleware = require('./middleware/corsMiddleware'); 
dotenv.config();

const app = express();
app.use(corsMiddleware); 
app.use(express.json());

const db = process.env.MONGODB_URI || 'your_default_mongoDB_URI';
const port = process.env.PORT || 5000;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/todos', todoRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));