// arquivo contendo todos os middlewares de autenticação
const passport = require('passport');
const jwt = require('jsonwebtoken');


// middleware para login
function loginMiddleware(req, res, next) {
  passport.authenticate(
    'login',
    (err, user, info) => { // Custom callback
      try {
        if (err) {
          return next(err);
        }

        req.login(
          user,
          {session: false},
          (error) => {
            if (error) next(error);

            const body = {
              id: user.id,
              role: user.role,
            };

            const token = jwt.sign({user: body}, process.env.SECRET_KEY,
              {expiresIn: process.env.JWT_EXPIRATION});

            res.cookie('jwt', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            });

            res.status(204).end();
          },
        );
      } catch (error) {
        next(error);
      }
    },
  )(req, res, next);
}

// middleware para checkar se o user possui ou nao o jwt para acessar as rotas
function jwtMiddleware(req, res, next) {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(
        'Você precisa estar logado para realizar essa ação');
    }

    req.user = user;

    next();
  })(req, res, next);
}

function checkRole(role) {
  return (req, res, next) => {
    if (req.user) {
      if (req.user.role === role) {
        next();
      } else {
        res.status(401).send('Você não tem permissão para realizar essa ação');
      }
    }
  };
}

// middleware para checkagem se o usuário já esta logado
function notLoggedIn(req, res, next) {
  const token = req.cookies['jwt'];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (!(err instanceof jwt.TokenExpiredError)) {
        res.status(400).send('Você já está logado no sistema!');
      }
    });
  }
  next();
}

// usamos um objeto para exportarmos varias funções(middlewares) ao mesmo tempo
module.exports = {
  loginMiddleware,
  notLoggedIn,
  jwtMiddleware,
  checkRole,
};
