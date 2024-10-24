const db = require('../config/db');

const User = {
    create: (user, callback) => {
        db.query('INSERT INTO users SET ?', user, callback);
    },
    findById: (id, callback) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], callback);
    },
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },
    getAll: (callback) => {
        db.query('SELECT * FROM users', callback);
    },
    update: (id, user, callback) => {
        db.query('UPDATE users SET ? WHERE id = ?', [user, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    }
};

module.exports = User;
