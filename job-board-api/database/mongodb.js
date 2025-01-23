const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connection successfull !!"))
    .catch(err => console.log("Error connecting to database", err));

