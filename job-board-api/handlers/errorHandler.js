const { validationResult } = require("express-validator");

const errorHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({"code": 400, "message": "Invalid Request", "errors": errors.array()});
    }

    next();
};

module.exports = errorHandler;