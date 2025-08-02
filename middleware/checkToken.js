// server/middleware/checkToken.js
// Aqui eu fiz uma função(bem básica) middleware para verificar o token JWT e saber se o usuário está autenticado antes de acessar as rotas protegidas.

const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' });
  }

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido!' });
  }
}

module.exports = checkToken;
