const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sampledb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connection successfull !!"))
    .catch(err => console.log("Error connecting to database", err));

