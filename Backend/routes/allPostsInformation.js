const express = require("express");
const Post = require("../models/Posts");

const allPostsInformationRouter = express.Router();
allPostsInformationRouter.get("/allpostsinformation", async (req, resp) => {
    let data = await Post.find({});
    resp.send(data);
    // console.log(data);
});

module.exports = allPostsInformationRouter;