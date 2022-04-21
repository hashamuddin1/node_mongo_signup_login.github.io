const express = require("express");
const router = new express.Router();
const { allsignup, login, deletesignup, addsignup } = require("../controllers/signup_controller")

//GET ALL SIGNUP
router.get("/api/allsignup", allsignup)

//INSERT SIGNUP
router.post("/api/addsignup", addsignup)

//DELETE SIGNUP
router.delete("/api/deletesignup/:id", deletesignup)

//login
router.post("/api/login", login)


module.exports = router