const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    User.create({ name, email, password: hashedPassword }, (err, result) => {
        if (err) return res.status(500).send('Error registering user');
        res.status(201).send({ message: 'User registered successfully' });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err || !user.length) return res.status(404).send('User not found');
        
        const isValidPassword = bcrypt.compareSync(password, user[0].password);
        if (!isValidPassword) return res.status(401).send('Invalid password');

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    });
};
