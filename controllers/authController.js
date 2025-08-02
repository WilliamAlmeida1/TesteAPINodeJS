// server/controllers/authController.js
// Aqui nesse arquivo estão as funções de registro e login do usuário, usei express-validator para validar os dados de entrada e bcrypt para criptografar a senha.
// no entanto foi só para testes básicos, é preciso implementar mais validações e mudanças de segurança.

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(422).json({ message: 'E-mail já cadastrado!' });

  const salt = await bcrypt.genSalt(16);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: passwordHash });

  try {
    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário!' });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' });

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return res.status(422).json({ message: 'Senha inválida!' });

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Autenticação realizada com sucesso!',
      token,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao realizar login!' });
  }
};
