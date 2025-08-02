// server/controllers/taskController.js
// Aqui estão as funções relacionadas às tarefas, como criar, buscar, atualizar e deletar tarefas.

const Task = require('../models/Task');

// Criar tarefa
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({
      title,
      description,
      userId: req.userId,
    });

    await task.save();
    res.status(201).json({ message: 'Tarefa criada com sucesso', task });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
};

// Buscar todas as tarefas do usuário autenticado
exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
};

// Modificar uma tarefa
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, description, completed },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

// Deletar uma tarefa
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });

    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

    res.status(200).json({ message: 'Tarefa removida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar tarefa' });
  }
};
