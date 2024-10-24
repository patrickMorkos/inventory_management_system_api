const User = require('../models/User');

exports.getAllUsers = (req, res) => {
    User.getAll((err, users) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(users);
    });
};

exports.getUserById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(user);
    });
};

exports.updateUser = (req, res) => {
    User.update(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'User updated successfully' });
    });
};

exports.deleteUser = (req, res) => {
    User.delete(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'User deleted successfully' });
    });
};
