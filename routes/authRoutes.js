const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User")
const jwt = require("jsonwebtoken")

require('dotenv').config();

router.post('/signup', 
    (req,res) => {
        //res.send('This is signup page');
        //console.log(req.body);
        const {name, email, password} = req.body;
        if (!email || !password || !name) {
            return res.status(422).send({error: "Please fill all the fields"});
        }

        User.findOne({email:email}).then(
            async (savedUSer) => {
                if(savedUSer){
                    return res.status(422).send({error: "User already exists"});
                }
                const user = new User({
                    name,email,password
                })

                try{
                    await user.save();
                    //res.send({ message: "User saved successfully"});
                    const token = jwt.sign({_id: user._id}, process.env.jwt_secret);
                    res.send({token});
                }
                catch (err) {
                    console.log('db err',err);
                    return res.status(422).send({error : err.message})
                }
            }
        )
    })

module.exports = router