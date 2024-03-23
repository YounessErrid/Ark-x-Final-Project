const passport = require("passport");
const Client = require("../../api/models/client.model");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((client, done) => {
  done(null, client._id);
});

passport.deserializeUser((id, done) => {
  Client.findById(id)
    .then((client) => {
      done(null, client);
    })
    .catch((err) => {
      done(err, null);
    });
});

// Implement Local Authentication Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const client = await Client.findOne({ email });
      if (client) {
        const isMatch = bcrypt.compareSync(password, client.password);
        if (isMatch) {
          return done(null, client);
        } else {
          return done(null, false, { message: "Client Password mismatch" });
        }
      }
      return done(null, false, { message: "Client loged not found" });
    }
  )
);
