const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("./key");

const User = require("./models/User");

exports.localStrategy = new LocalStrategy(
  { usernameField: "username" },
  async (name, password, done) => {
    try {
      const user = await User.findOne({ username: name });
      const passwordsMatch = user
        ? bcrypt.compare(password, user.password)
        : false;
      if (passwordsMatch) {
        return done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error);
    }
  }
);

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      console.log("jwt expired");
      return done(null, false);
    }
    try {
      const user = await User.findById(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
