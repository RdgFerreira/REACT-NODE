const router = require('express').router(); // Isolar as rotas p/ usuários
const UserService = require('../service/UserService');

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

router.get('./', async (req, res) => { // Read
  try {
    const users = await UserService.getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await UserService.getUsersById(userID);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

router.put('/user/:id', async (req, res) => { // Update
  try {
    const userID = req.params.id;
    await UserService.updateUser(userID, req.body);

    res.status(204).end;
  } catch (error) {
    console.log(error);
  }
});

router.delete('/user/:id', async (req, res) => { // Delete
  try {
    const userID = req.params.id;
    await UserService.deleteUser(userID);

    res.status(204).end;
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

