const express = require("express");
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {

    const jwtToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!jwtToken) {
        return res.status(401).json({code: 401, message: "Missing Authorization", data: null});
    }

    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(400).json({code: 400, message: "Invalid/Expired Authenticatin token", data: null});
        }

        req.username = user.username;
        next();
    });
    return;
};


const generateJwtToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
}

module.exports = {
    authMiddleware,
    generateJwtToken
}