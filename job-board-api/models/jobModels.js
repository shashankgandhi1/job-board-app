const mongoose = require("mongoose");

// Job Model

const jobSchema = mongoose.Schema ({
    jobid: {type: String},
    title: {type: String, length: {max: 100}},
    client: {type: String},
    desc: {type: String},
    salary: {type: Number},
    deadline: {type: Date}
});

const JobModel = mongoose.model("jobs", jobSchema);

module.exports = {
    JobModel
}