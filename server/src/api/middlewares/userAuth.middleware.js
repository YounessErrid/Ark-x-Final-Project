const passport = require('passport');

const authenticate = (req, res, next) => {
  passport.authenticate('local', { failureFlash: true }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({ message:  'Username or password is incorrect' });
      // return res.status(401).json({ message: `User ${info.message}`|| 'Authentication failed: user not found' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return next()
    });
  })(req, res, next);
}

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).send({ message: 'You are not authorized session expired' })
}

module.exports = {
  isAuthenticated,
  authenticate
};