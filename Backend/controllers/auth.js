const User = require("../models/User");
const bcrypt = require("bcrypt");
const express = require("express")
/* REGISTER USER */
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, userName, batch, email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res
                .status(400)
                .json({ message: "Email address is not connected to an account" });
        }
        else {
            const hashedpassword = await bcrypt.hash(password, 10);
            const newuser = new User({
                firstName,
                lastName,
                userName,
                batch,
                email,
                password: hashedpassword,
            });
            console.log(newuser);
            let result = await newuser.save();
            return res.status(200).json({ message: "Registration sucessful" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/*LOGIN FUNCTION*/
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res
                .status(400)
                .json({ message: "Email address is not connected to an account" });
        } else {
            if (!(await bcrypt.compare(password, foundUser.password))) {
                return res.status(400).json({ message: "Invalid credentials" });
            } else {
                return res
                    .status(200)
                    .json({ message: "login successful", user: foundUser });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

/**/