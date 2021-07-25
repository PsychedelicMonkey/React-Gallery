const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// Database
mongoose.connect(config.get('db'), {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
})
.then(() => console.log('MongoDB Connected....'))
.catch(err => console.log(err));

// Routes
app.use('/api/photos', require('./routes/api/photos'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
