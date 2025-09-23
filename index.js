const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const vendorRoutes = require("./routes/vendorRoutes");
const bodyparser = require("body-parser")
const PORT = process.env.PORT || 4000;

dotEnv.config();
mongoose.connect(process.env.mongo_uri)
    .then(() => {
        console.log("Connected sucessfully Bro.....")
    })
    .catch((error) => {
        console.log(error)
    })
    app.use(bodyparser.json());
    app.use("/vendor",vendorRoutes);

app.listen(PORT, () => {
    console.log(`server is running at ${PORT} `)
})


app.use(("/"), (req, res) => {
    res.send("<h1>Wellcome to Home Page Bro.....!<h1>")
})
