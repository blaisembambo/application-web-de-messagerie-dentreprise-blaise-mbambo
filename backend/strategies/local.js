const localStrategy = require("passport-local");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {User} = require("../models/userSchema");

localStrategy.Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
      },
      (email, password, done) => {
        User.findOne({ email: email }).then((user) => {
          if (user) {
            bcrypt.compare(password, user.password, (error, passwordMacth) => {
              if (error) return done(null,false,{message:"an error ocured,please try again"});
              if (passwordMacth) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password doesn't match" });
              }
            });
          }else{
            done(null, false, { message: "your credentials do not exist" });

          }
        });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
