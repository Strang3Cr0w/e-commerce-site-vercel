const express = require("express");
const pageRouter = express.Router();
const path = require("path");

pageRouter.get("/signUp", (req, res, next) =>{
    res.render("signUp.ejs");
});

pageRouter.get("/signIn", (req, res, next) =>{
    res.render("signIn.ejs");
});

pageRouter.get("/index", (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

pageRouter.get("/cart", (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "public", "cart.html"));
});

pageRouter.get("/checkout", (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "public", "checkout.html"));
});

pageRouter.get("/account", (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "public", "account.html"));
});

pageRouter.get("/signUpConfirm", (req, res, next) =>{
    res.sendFile(path.join(__dirname, "..", "public", "signUpConfirm.html"));
});

pageRouter.get("/addNewAddress", (req, res, next) =>{
    res.sendFile(path.join(__dirname, "..", "public", "addNewAddress.html"));
});

pageRouter.get("/loggedOut", (req, res, next) =>{
    res.sendFile(path.join(__dirname, "..", "public", "loggedOut.html"));
});

pageRouter.get("/updateEmail", (req, res, next) =>{
    res.sendFile(path.join(__dirname, "..", "public", "updateEmail.html"));
});

module.exports = pageRouter;