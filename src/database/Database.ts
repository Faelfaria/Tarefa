import SQLite from

const database_name = "TaskDatabase.db";
const database_version = "1.0";
const database_displayname = "SQLite React Native";
const database_size = 200000;

const db = SQLite.openDatabase(
    {
        name: database_name,
        location: 'default',
        createFromLocation: "~www/TaskDatabase.db"
    },
    () => { console.log('Database opened'); },
    error => { console.log(error); }
);

export const createTables = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                description TEXT,
                color TEXT
            );`
        );
    });
};

export const addTask = (task) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Tasks (title, description, color) VALUES (?, ?, ?)',
                [task.title, task.description, task.color],
                (tx, results) => { resolve(results); },
                (error) => { reject(error); }
            );
        });
    });
};

export const getTasks = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Tasks',
                [],
                (tx, results) => {
                    const tasks = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        tasks.push(results.rows.item(i));
                    }
                    resolve(tasks);
                },
                (error) => { reject(error); }
            );
        });
    });
};

export const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Tasks WHERE id = ?',
                [id],
                (tx, results) => { resolve(results); },
                (error) => { reject(error); }
            );
        });
    });
};

export const updateTask = (id, task) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE Tasks SET title = ?, description = ?, color = ? WHERE id = ?',
                [task.title, task.description, task.color, id],
                (tx, results) => { resolve(results); },
                (error) => { reject(error); }
            );
        });
    });
};
