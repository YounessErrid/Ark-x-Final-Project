const passport = require('passport');
const Agency = require("../../api/Agency/agency.model");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((agency, done) => {
    done(null, agency._id);
});
passport.deserializeUser((id, done) => {
    agency.findById(id)
     .then((agency) => {
        done(null,agency);
     })
     .catch((err) => {
        done(err, null);
      });
    });


    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        }, 
        async (email, password, done) => {
            const agency = await Agency.findOne({ email: email });
                if(agency){
                    const isMatch = bcrypt.compareSync(password, agency.password);
                    if(isMatch){
                        return done(null, agency);
                    }else{
                        return done(null, false, {message: 'Invalid password'});
                    }
                }
                return done(null, false, {message: 'Agency loged not found'});
            }
            )
    );

    