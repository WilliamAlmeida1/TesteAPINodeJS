// server/routes/tasks.js
// Aqui ficam todas as rotas relacionadas às tarefas

const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/checkToken');
const taskController = require('../controllers/taskController');

// Todas as rotas exigem autenticação
router.post('/', checkToken, taskController.createTask);
router.get('/', checkToken, taskController.getUserTasks);
router.put('/:id', checkToken, taskController.updateTask);
router.delete('/:id', checkToken, taskController.deleteTask);

module.exports = router;
