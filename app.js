// server/app.js
// Aqui é o arquivo principal da API, onde configuramos o Express, todas as rotas e a conexão com o MongoDB(mongoose).

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require("express-rate-limit");

// Configuração do Express(usando JSON)
const app = express();
app.use(express.json());

// Configuração do CORS para permitir requisições
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// limitador de requisições nas rotas de autenticação( limita 10 requisições a cada 5 minutos)
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: "Muitas tentativas. Tente novamente mais tarde."
});

// rotas que serão usadas
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// rota pública de teste
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem vindo ao teste de API de tarefas' });
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/tasks', taskRoutes);

// Conectar ao MongoDB usando mongoose e MONGOURL do .env
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(3000);
    console.log('Connected to MongoDB');
  })
  .catch(err => console.log('Erro ao se conectar ao MongoDB:'));
