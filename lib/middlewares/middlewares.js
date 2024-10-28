const jwt = require('jsonwebtoken');
const tokenBlocklist = require('../tokenBlocklist/tokenBlocklist')

//This middleware function validate the token
async function authenticateToken(req, res, next) {
    const token = req.headers['authorization']; // Get token from "Authorization: Bearer <token>"

    if (!token) return res.status(401).json({ message: 'Access Denied: User not logged in' });

    // Check if token is in the blocklist
    if (await tokenBlocklist.isTokenBlocked(token)) {
        return res.status(403).json({ message: 'Invalid Token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.userId = decoded.userId; // Attach decoded userId to the request object
        next();
    });
}

module.exports = authenticateToken;
