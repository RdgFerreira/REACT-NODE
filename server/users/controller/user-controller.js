const router = require('express').Router(); // Isolar as rotas p/ usuários
// const {route} = require('../../config/express-config');
const UserService = require('../service/UserService');

// require de middlewares
const {
  loginMiddleware,
  notLoggedIn,
  jwtMiddleware,
  checkRole,
} = require('../../middlewares/auth-middlewares');

// require do filtro
const objectFilter = require('../../middlewares/object-filter');
// require das validações
const userValidate = require('../../middlewares/user-validator');

// CRIAR USER
router.post('/',
  objectFilter('body', ['name', 'email', 'image', 'password']),
  userValidate('createUser'),
  async (req, res) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
        role: 'user',
      };

      await UserService.createUser(user);

      res.status(201).end(); // Resposta vazia bem sucedida
    } catch (error) {
      console.log(error);
    }
  });

// RETRIEVE DE USERS
router.get('/', jwtMiddleware, async (req, res) => { // Read
  try {
    const users = await UserService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

// RETRIEVE DE USER ESPECÍFICO
router.get('/user/:id', jwtMiddleware, async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await UserService.getUsersById(userID);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

// UPDATE DE USER ESPECÍFICO
router.put('/user/:id',
  jwtMiddleware,
  objectFilter('body', ['name', 'email', 'image']),
  userValidate('updateUser'),
  async (req, res) => { // Update
    try {
      const userID = req.params.id;
      await UserService.updateUser(
        userID, req.user.id, req.user.role, req.body);

      res.status(204).end();
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

// DELEÇÃO DE USER ESPECÍFICO
router.delete('/user/:id',
  jwtMiddleware,
  checkRole('admin'),
  async (req, res) => { // Delete
    try {
      const userID = req.params.id;
      await UserService.deleteUser(userID, req.user.id);

      res.status(204).end();
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

// LOGIN
router.post('/login', notLoggedIn, userValidate('login'), loginMiddleware);

// LOGOUT
router.get('/logout', jwtMiddleware, (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

router.get('/me', jwtMiddleware, async (req, res) => {
  const user = await UserService.getCurrentUser(req.user.id);

  res.status(200).json(user);
});


module.exports = router;
