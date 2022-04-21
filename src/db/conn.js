const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/logindb', {
    useNewUrlParser: true
}).then(() => {
    console.log("Connection Successful")
}).catch((e) => {
    console.log(e)
})