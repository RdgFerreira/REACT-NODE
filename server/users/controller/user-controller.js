const router = require('express').Router(); // Isolar as rotas p/ usuários
// const {route} = require('../../config/express-config');
const UserService = require('../service/UserService');

// require de middlewares
const {
  loginMiddleware,
  notLoggedIn,
  jwtMiddleware,
} = require('../../middlewares/auth-middlewares');

// CRIAR USER
router.post('/', async (req, res) => { // Create
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
router.put('/user/:id', jwtMiddleware, async (req, res) => { // Update
  try {
    const userID = req.params.id;
    await UserService.updateUser(userID, req.body);

    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

// DELEÇÃO DE USER ESPECÍFICO
router.delete('/user/:id', jwtMiddleware, async (req, res) => { // Delete
  try {
    const userID = req.params.id;
    await UserService.deleteUser(userID);

    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

// LOGIN
router.post('/login', notLoggedIn, loginMiddleware);

// LOGOUT
router.get('/logout', jwtMiddleware, (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
