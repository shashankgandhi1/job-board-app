const express = require("express");
const cors = require("cors");
const path = require("path");

const dotenv = require('dotenv');

dotenv.config();


const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json()); // For json response
app.use(express.urlencoded({ extended: false })); // To read form data in body

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use(express.static(path.join(__dirname, "public")));

// Load database
require("./database/mongodb");

// Load routers
const indexRouter = require("./routers/index");
const jobRouter = require("./routers/jobs");

app.use("/", indexRouter);
app.use("/jobs", jobRouter);

app.get("/health", (req, res) => {
    res.json({"status": "online"});
});

app.listen(port, () => {
    console.log(`Test application listening on port: ${port}`);
});