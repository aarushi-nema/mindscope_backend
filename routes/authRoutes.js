const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

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

router.post('/signin', async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(422).json({error: "Please add email or password"})
    }
    const savedUser = await User.findOne({email:email})

    if(!savedUser){
        return res.status(422).json({error: "Inavlid Credentials"});
    }

    try {
        bcrypt.compare(password, savedUser.password, (err,result) => {
            if(result){
                console.log("Password matched")
                const token = jwt.sign({_id: savedUser._id}, process.env.jwt_secret)
                res.send({token});
            }
            else {
                console.log("Password does not match")
                return res.status(422).json({err: "Invalid Credentials"});
            }
        })
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router