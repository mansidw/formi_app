const db = require("../models")
const User = db.user;

exports.allAccess = async (req, res) => {
    const users = await User.find()
    console.log(users[0]["username"])
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};