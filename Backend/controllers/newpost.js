const Posts = require("../models/Posts");
const express = require("express")
/* NEW POST */
exports.newpost = async (req, res) => {
    try {
        const { email, title, description, date } = req.body;
        const newposts = new Posts({
            email, 
            title, 
            description, 
            date,
        });
        console.log(newposts);
        let result = await newposts.save();
        return res.status(200).json({ message: "Posted !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};