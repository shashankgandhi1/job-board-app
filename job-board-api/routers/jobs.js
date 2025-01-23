const express = require("express");
const { body, query } = require("express-validator");
const crypto = require("crypto");
const {v4: uuidv4} = require("uuid");

const { JobModel } = require("../models/jobModels");
const errorHandler = require("../handlers/errorHandler");
const { authMiddleware } = require("../handlers/authHandler");

const jobsRouter = express.Router();

jobsRouter.use(authMiddleware);

jobsRouter.post("/create", [
    body("title").notEmpty().withMessage("Missing Job title"),
    body("title").isLength({max: 100}).withMessage("Job title should be less than 100 characters"),
    body("client").notEmpty().withMessage("Client name missing"),
    body("desc").notEmpty().withMessage("Missing Job description"),
    body("salary").notEmpty().withMessage("Missing salary"),
    body("deadline").notEmpty().withMessage("Missing Job application deadline"),
    body("deadline").isDate({format: "YYYY-MM-DD", strictMode: true}).withMessage("Invalid date for deadline")
], errorHandler, async (req, res, next) => {

    const jobid = crypto.createHash("md5").update(uuidv4()).digest("hex");

    const job = new JobModel({
        jobid: jobid,
        title: req.body.title,
        client: req.body.client,
        desc: req.body.desc,
        salary: req.body.salary,
        deadline: req.body.deadline
    });

    await job.save();

    return res.status(202).json({code: 202, message: "Job Application Created !!", data: jobid});
});


jobsRouter.get("/getAll", async (req, res, next) => {
    const allJobs = await JobModel.find();

    return res.status(200).json({code: 200, message: "Jobs fetched", data: allJobs});
})

jobsRouter.get("/get", [
    query("jobid").notEmpty().withMessage("Missing Job ID")
], errorHandler, async (req, res, next) => {
    const job = await JobModel.findOne({jobid: req.query.jobid});

    if (!job) {
        return res.status(200).json({code: 404, message: "Job not found", data: null});
    }

    return res.status(200).json({code: 200, message: "Job fetched", data: job});
});

module.exports = jobsRouter;