const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const AuthUser = require('../models/AuthUser');

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      AuthUser.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: 'Incorrect username or password' });
        }

        bcrypt.compare(password, user.password, (err, success) => {
          if (err) throw err;

          if (!success) {
            return done(null, false, { message: 'Incorrect username or password' });
          }

          return done(null, user);
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    AuthUser.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
