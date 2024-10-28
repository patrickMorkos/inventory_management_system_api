const BlockedToken = require('../../models/BlockedToken');
const { Op } = require('sequelize');

exports.addToBlocklist = async (token, expirationInSeconds) => {
    const expirationDate = new Date(Date.now() + expirationInSeconds * 1000);
    await BlockedToken.create({ token, expires_at: expirationDate });
};

exports.isTokenBlocked = async (token) => {
    const blockedToken = await BlockedToken.findOne({
        where: {
            token,
            expires_at: { [Op.gt]: new Date() }, // Ensure it's still valid (not expired)
        },
    });
    return !!blockedToken;
};
