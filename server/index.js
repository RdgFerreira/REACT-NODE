const app = require('./config/express-config');

/*
app.get('/', (req, res) => {
  res.send('<h1>Hello, World!<h1>');
});


app.get('/user', (req, res) => {
  const pessoa = {
    nome: 'Gabriel',
    sobrenome: 'Sellin',
  };

  res.json(pessoa);
});

app.post('/mirror', (req, res) => {
  res.json(req.body);
});
*/


app.listen(3000, 'localhost', () => console.log('Servidor rodando.'));
