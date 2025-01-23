const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");

const { UserModel } = require("../models/userModels");
const errorHandler = require("../handlers/errorHandler");
const { generateJwtToken } = require("../handlers/authHandler");

const indexRouter = express.Router();

// indexRouter.get("/login", (req, res, next) => {
//     res.render("login", {});
// });

indexRouter.post("/login", [
    body("username").notEmpty().withMessage("Username missing"),
    body("password").notEmpty().isLength({ min: 6 }).withMessage("Invalid password")
], errorHandler, async (req, res, next) => {

    const user = await UserModel.findOne({username: req.body.username});

    if (!user) {
        return res.status(401).send({"code": 401, "message": "User not found", "data": null});
    }

    const passMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passMatch) {
        return res.status(401).send({"code": 401, "message": "Incorrect password", "data": null});
    }

    const jwtToken = generateJwtToken({username: user.username});

    return res.json({"code": 200, "message": "Logged In", "data": {user: user, authToken: jwtToken}});
});


indexRouter.post("/signup", [
    body("username").notEmpty().withMessage("Username missing"),
    body("password").notEmpty().isLength({min:6}).withMessage("Password should be atleast 6 characters"),
    body("emailid").notEmpty().isEmail().withMessage("Invalid Email ID"),
    body("category").notEmpty().isIn(["Recruiter", "Job Seeker"]).withMessage("Invalid user category")
], errorHandler, async (req, res, next) => {
    const existingUser = await UserModel.findOne({username: req.body.username});
    if (existingUser) {
        return res.status(409).json({code: 409, message: "User already exists !!", data: null});
    }

    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    
    const user = new UserModel({
        username: req.body.username,
        password: passwordHashed,
        emailid: req.body.emailid,
        phone: req.body?.phone,
        category: req.body.category
    });
    await user.save();

    return res.status(202).json({code: 202, message: "User created !!", data: null});
    
})

module.exports = indexRouter;