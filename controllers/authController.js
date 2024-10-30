const authService = require("../services/authService")
const tokenBlocklist = require('../lib/tokenBlocklist/tokenBlocklist')
const jwt = require('jsonwebtoken');

//Controller for all the Authorization functionalities
class AuthController {
    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            console.log(`Log::Successfully registered user with id: '${user.id}'`)
            res.status(200).json(user);
        } catch (err) {
            console.log(`Log::Failed to registered user with error: '${err.message}'`)
            res.status(400).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userData = await authService.login(email, password);
            console.log(`Log::Successfully logged in user with id: '${userData.user.id}'`)
            res.status(200).json(userData);
        } catch (err) {
            console.log(`Log::Failed to login user with error: '${err.message}'`)
            res.status(400).json({ error: err.message });
        }
    }

    async changePassword(req, res) {
        try {
            const result = await authService.changePassword(req.body.id, req.body.newPassword);
            console.log(`Log::Successfully changed password for user with id: '${req.body.id}'`)
            res.status(200).json(result);
        } catch (err) {
            console.log(`Log::Failed to change password with error: '${err.message}'`)
            res.status(400).json({ error: err.message });
        }
    }

    async logout(req, res) {
        try {
            const token = req.headers['authorization'];
            if (!token) return res.status(400).json({ message: 'No token provided' });

            // Decode token to get expiration time
            const decoded = jwt.decode(token);
            const expirationInSeconds = decoded.exp - Math.floor(Date.now() / 1000);

            // Add token to the blocklist with its remaining lifetime
            await tokenBlocklist.addToBlocklist(token, expirationInSeconds);
            console.log(`Log::Successfully logged out user with id: '${req.body.id}'`)
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.log(`Log::Failed to logout user with error: '${error}'`)
            res.status(500).json({ message: 'An error occurred during logout', error });
        }
    }
}

module.exports = new AuthController();