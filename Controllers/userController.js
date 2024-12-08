import { comparePassword, createToken, hashPassword } from "../Middlewares/authentication.js"
import userModel from "../Models/userModel.js";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            req.body.password = await hashPassword(req.body.password);
            let newUser = await userModel.create(req.body);
            newUser.save();
            res.status(201).json({ message: `${req.body.name} registered successfully` });
        } else {
            res.status(400).json({ message: `User with ${req.body.email} already exist` });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

export const login = async (req,res) => {
    try {
        let user = await userModel.findOne({email: req.body.email});
        if(user){
            if(await comparePassword (req.body.password, user.password)){
                let token = await createToken(user);
                res.status(200).json({message: "Login Successfully", token});
            }else{
                res.status(400).json({message: "Invalid Credential"})
            }
        }else{
            res.status(404).json({message: `User with ${req.body.email} do not exist`})
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error?.message})
    }
};


export const forgotPassword = async (req, res) => {
    try {
        const oldUser = await userModel.findOne({ email: req.body.email })
        if (oldUser) {
            const passwordLink = `http://localhost:3000/${oldUser._id}`

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'vigneshecom093@gmail.com',
                    pass: 'kznv npox aaxy nnvp'
                }
            })

            var mailOptions = {
                from: 'vigneshmsho093@gmail.com',
                to: req.body.email,
                subject: 'Reset your password ',
                text: `Kindly visit the link and change your password ${passwordLink}`,
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            res.status(200).send({ message: 'Email Sent Successfully' });

        }

        else {
            res.status(404).send({ message: `User with ${req.body.email} doesn't exists`, error: error?.message });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message });

    }
};

export const resetPassword = async (req, res) => {
    try {
        let user = await userModel.findById({ _id: req.params.id });
        if (user) {
            user.password = await hashPassword(req.body.password);
            user.save()
            res.status(200).send({ message: "Password Updated Successfullly" });
        }
        else {
            res.status(404).send({ message: `User not found` });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message });
    }
};