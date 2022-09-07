
const db = require('../config/db');
const Todo = require('../models/Todo');

exports.getAllTasks = async (req, res, next) => {
    let sql = `
    SELECT * FROM tasks;
    `
    const [tasks, _] = await db.execute(sql);
    res.send(tasks);
    return tasks;
}

exports.addTask = async (req, res, next) => {
    let { title } = req.body;
    let todo = new Todo(title);

    todo = await todo.add();
    res.send("Created a new task");
}

exports.editTaskById = async (req, res, next) => {
    const taskId = req.params.id;
    let { title } = req.body;
    let sql =  `
        UPDATE tasks SET title = "${title}" WHERE id = ${taskId};
    `
    const [tasks, _] = await db.execute(sql);
    res.send(tasks);
    return tasks;
}

exports.deleteTask = async (req, res, next) => {
    const taskId = req.params.id;

    let sql =  `
        DELETE FROM TASKS WHERE id = ${taskId};
    `
    const [tasks, _] = await db.execute(sql);
    res.send(tasks);
    return tasks;
}