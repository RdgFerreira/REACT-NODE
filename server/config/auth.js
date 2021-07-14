const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../users/model/User');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },

    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {email: email},
        });

        if (!user) {
          throw new Error('Email e/ou senha incorretos!');
        }

        const matchingPassword = (password == user.password);

        if (!matchingPassword) {
          throw new Error('Email e/ou senha incorretos!');
        }

        return done(null, user); // 1 campo: null: ok, 2 campo dados do usuario
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
};

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: cookieExtractor,
    },

    async (jwtPayLoad, done) => {
      try {
        return done(null, jwtPayLoad.user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
