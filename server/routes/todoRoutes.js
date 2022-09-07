const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();

router.route('/')
  .get(todoController.getAllTasks)
  .post(todoController.addTask);

router.route('/:id').put(todoController.editTaskById);

router.route('/:id').delete(todoController.deleteTask)

module.exports = router;
