const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

require('dotenv').config();

const nodemailer = require("nodemailer");

async function mailer(recievermail, code) {
 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "aarushi.nema02", // generated ethereal user
      pass: "xqynpmnifwajjjpt", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "aarushi.nema02@gmail.com", // sender address
    to: `${recievermail}`, // list of receivers
    subject: "MindScope sign up verification", // Subject line
    text: `Your verfication code is ${code}`, // plain text body
    html: `Welcome to MindScope! Your verfication code is ${code}`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


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

router.post('/verify', (req,res) => {
    const {name, email, password} = req.body;
    if (!email || !password || !name) {
        return res.status(422).send({error: "Please fill all the fields"});
    }
    console.log('Sent by client - ', req.body)
    User.findOne({email:email}).then(
        async (savedUSer) => {
            if(savedUSer){
                return res.status(422).send({error: "User already exists"});
            }
            try {
                let VerificationCode = Math.floor(100000 + Math.random() * 900000)
                let user = [
                    {
                        name,
                        email, 
                        password,
                        VerificationCode
                    }
                ]
                await mailer(email, VerificationCode);
                res.send({message: 'Verification code sent to your Email', userData: user})
            } catch (error) {
                console.log(error)
            }
        }
    ) 
    
})

module.exports = router