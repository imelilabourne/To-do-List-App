const db = require('../config/db'); 
class Todo {
    constructor(title){
        this.title = title;
    }

    async add() {
        let sql = `
        INSERT INTO tasks(
            title, 
            completed, 
            editing
        )
        VALUES(
            '${this.title}',
            '0',
            '0'
        );
        `

        const [newTask, _] = await db.execute(sql);
        return newTask;
    }
}

module.exports = Todo;