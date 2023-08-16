const express = require("express");
const { newpost } = require("../controllers/newpost.js");

const newpostRouter = express.Router();

newpostRouter.post("/newpost", newpost);

module.exports = newpostRouter;