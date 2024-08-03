const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todo');

dotenv.config();

const app = express();
app.use(cors());
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

createInitialTodo();
