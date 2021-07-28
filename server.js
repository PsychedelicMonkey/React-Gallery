const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('./utils/passport')(passport);

// Middleware
app.use(express.json());
app.use(session({
  secret: config.get('secret'),
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Database
mongoose.connect(config.get('db'), {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
})
.then(() => console.log('MongoDB Connected....'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/photos', require('./routes/api/photos'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
