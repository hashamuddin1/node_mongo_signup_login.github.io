const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3004;
require("../src/db/conn");
const app = express();
const router = require("../src/routes/router")

app.use(bodyParser.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING IN PORT ${PORT}`)
})