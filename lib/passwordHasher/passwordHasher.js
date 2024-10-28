const bcrypt = require('bcryptjs');

//This class hashes the password
class PasswordHasher {
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
}

module.exports = new PasswordHasher();