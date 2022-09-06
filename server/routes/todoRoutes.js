const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();

router.route('/')
  .get(todoController.getAllTasks)
  .post(todoController.addTask);

router.route('/:id').post(todoController.editTaskById);

module.exports = router;
