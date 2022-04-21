const express = require('express');
const bcrypt = require("bcrypt");
const { signup } = require("../models/signups");
const jwt = require("jsonwebtoken");

//View all signup
const allsignup = async(req, res) => {
    try {
        const getsignup = await signup.find({})
        res.status(201).send(getsignup) //koi bhi data insert krne k liye
            //status uska 201 hona chahye
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

//create signup
const addsignup = async(req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            console.log(err)
        } else {
            const sign = new signup({
                user_name: req.body.user_name,
                password: hash,
                email: req.body.email,
                phone_number: req.body.phone_number,
                usertype: req.body.usertype
            })
            sign.save()
                .then(result => {
                    res.status(201).send(result)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err)
                })
        }
    })
}


//delete signup
const deletesignup = async(req, res) => {
    try {
        const del = await signup.findByIdAndDelete(req.params.id)

        res.send("Deleted Successfully")
    } catch (e) {
        console.log(e)
        res.status(500).send(e) //server say jo error ata hay uskay liye
            //500 port hogi OR update krtay waqt 500 port hogi
    }
}

//login
const login = async(req, res) => {
    signup.find({ email: req.body.email })
        .exec()
        //ab agar email match krega tw array banay gi aur usme usme email,passord,phone number waghera ki value ajaye gi
        //user ab ek array ban gaya hay k jisme email hay
        //agar ye array empty hay it means k email match nhi hui 
        .then(user => {
            if (user.length < 1) {
                console.log("Email is not found");
                return res.status(401).send("Email is not found");
            }

            //match password
            //user darasal array hay aur uskay anday object ki form may data store hay
            //isliye user[0] kia
            //it means k jaha user match hoa tw uska first object ka password
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                //ab agar result nhi mila it means k email sahi likhi but password ghlat hay
                if (!result) {
                    console.log("Password is incorrect");
                    return res.status(401).send("Password is incorrect");
                }
                //agar result match krgia tw ham token bana kr send krdege
                if (result) {
                    const token = jwt.sign({
                            username: user[0].user_name,
                            userType: user[0].usertype,
                            phonenumber: user[0].phone_number
                        },
                        "This is a dummy paragrapgh", {
                            //2 hr may agar token expire krna hoto
                            expiresIn: "2h"
                        }
                    );
                    res.status(200).json({
                        username: user[0].user_name,
                        userType: user[0].usertype,
                        phonenumber: user[0].phone_number,
                        token: token
                    })
                }
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        })
}

module.exports = { allsignup, login, deletesignup, addsignup }