const express = require("express");
const signUpRouter = express();
const {client} = require('../db.js');

signUpRouter.post("/signUp", (req, res, next) =>{
    let password = req.body.password;
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    client.query('INSERT INTO customers (password, email, first_name, last_name) VALUES($1,$2,$3,$4) RETURNING email', [password, email, firstName, lastName], (err,results)=>{
        if (err){
            console.log(err);
        }else{
            console.log("Query Success!");
            console.log(results.rows);
            res.redirect("signUpConfirm.html");
            }
        })
});

module.exports = signUpRouter;