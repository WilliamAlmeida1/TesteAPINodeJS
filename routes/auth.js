// server/routes/auth.js
// Aqui estão todas as rotas relacionadas à autenticação(registro e login)

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

// Função de registro de usuário
router.post('/register', [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
  body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('As senhas não conferem'),
], authController.register);

// Login
router.post('/login', [
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
], authController.login);

module.exports = router;
