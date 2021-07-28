const {body} = require('express-validator');
const validate = require('./validate');

// createUser: name, email, password, image
// login: email, password
// updateUser: name, email, image

function getValidations(method) {
  switch (method) {
  case 'login': {
    return [
      body('email')
        .exists()
        .withMessage('O campo de email deve estar preenchido!')
        .isEmail()
        .withMessage('O email inserido não é válido!'),
      body('password')
        .exists()
        .withMessage('Você deve digitar uma senha!')
        .notEmpty()
        .withMessage('O campo de senha deve estar preenchido!'),
    ];
  };
  case 'createUser': {
    return [
      body('name')
        .exists()
        .withMessage('Você deve enviar um nome!')
        .isAlpha('pt-BR', {ignore: ' '})
        .withMessage('Seu nome só pode conter letras!'),
      body('email')
        .exists()
        .withMessage('Você deve enviar um email!')
        .isEmail()
        .withMessage('O email inserido não é válido!'),
      body('password')
        .exists()
        .withMessage('Insira uma senha! (forte de preferência).')
        .isStrongPassword()
        .withMessage('Sua senha deve conter pelo menos 8 caracteres, com ' +
            'pelo menos um número, uma letra maiúscula e um caracter especial'),
      body('image')
        .exists()
        .withMessage('O campo de imagem deve ser preenchido!')
        .isURL()
        .withMessage('A imagem deve ser uma URL!'),
    ];
  };
  case 'updateUser': {
    return [
      body('name')
        .optional()
        .isAlpha('pt-BR', {ignore: ' '})
        .withMessage('Seu nome só pode conter letras!'),
      body('email')
        .optional()
        .isEmail()
        .withMessage('O email inserido não é válido!'),
      body('image')
        .optional()
        .isURL()
        .withMessage('A imagem deve ser uma URL!'),
    ];
  };
  }
}

function userValidate(method) {
  const validations = getValidations(method);
  return validate(validations);
}
module.exports = userValidate;
