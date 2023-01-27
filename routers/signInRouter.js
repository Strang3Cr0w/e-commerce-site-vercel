const express = require('express');
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy
const {pool} = require('../db.js');
const bcrypt = require("bcrypt")

const signUpLogInRouter = express.Router()

// for details about the signed in user use req.user
// to save session-specific data (like shopping cart info) use req.session (then add your own custom key-value pair e.g req.session.cart = [conch, seashell])

const login = {
    loggedIn: false,
    customerInfo: ''
}; 


passport.use(new LocalStrategy( {usernameField: "email"},(email, password, done)=>{
    pool.query("SELECT * FROM customers WHERE email = $1", [email], async (err, results)=>{
        if (err){
            done(err)
        }
        const passwordCheck = await bcrypt.compare(password, results.rows[0]["password"])
        if(results.rows.length > 0 && passwordCheck){
            done(null, results.rows[0])
        }
        else{
            done(null, false)
        }
        
    }
    )
})) 



passport.serializeUser((user, done)=>{
    done(null, user["id"])
})
passport.deserializeUser((id, done)=>{
    pool.query("SELECT * FROM customers WHERE id=$1", [id], (err, results)=>{
        //console.log(results.rows) // for testing purposes
        done(null, results.rows[0]["first_name"])
    })
})




//POST to add email, password, first name, and last name of new user to database 
signUpLogInRouter.post("/", (req,res)=>{
    console.log(req.body.newUserName)

    // Form Validation - making sure the email isn't in use (gotta say, ejs turned out to be pretty awesome)
    pool.query('SELECT * FROM customers WHERE email = $1', [req.body.newUserName], async(err, results)=>{
        let errors = [];
        console.log("selected");
        
        if(err) console.log(err);

        console.log(results.rows);
        console.log('Attempt has been made');

        if (results.rows.length > 0) errors.push({message: "Email is already registered"});

        if (errors.length > 0) {
            res.render("signup.ejs", {errors});
        }else{ // Validation has passed
            let securedPassword;
            try{
            const salt = await bcrypt.genSalt(10)
             securedPassword = await bcrypt.hash(req.body.newPassword, salt)
            }
            catch(err){
                console.log(err)
            }
            pool.query('INSERT INTO customers  (password, first_name, last_name, email) VALUES($1,$2,$3,$4) RETURNING email', [securedPassword, req.body.newFirstName, req.body.newLastName, req.body.newUserName], (err,results)=>{
            if (err){
                console.log(err);
            }else{
                console.log("Query Success!");
                console.log(results.rows);
                }
            })
            pool.query('SELECT * FROM customers WHERE email = $1', [req.body.newUserName], (err, results)=>{  
                login.customerInfo = results.rows[0];
                login.loggedIn = true;
                pool.query('INSERT INTO cart (id, conch, brokenheart, oceanswail, tinytitan, sailorsbounty, whiteprincess) VALUES($1,$2,$3,$4,$5,$6,$7)', [login.customerInfo.id, 0, 0, 0, 0, 0, 0]);
                pool.query('INSERT INTO addresses (id, address1, address2, address3, address4, address5) VALUES($1,$2,$3,$4,$5,$6)', [login.customerInfo.id, "NULL", "NULL", "NULL", "NULL", "NULL"]);
                res.render('signUpConfirm.ejs');
            })
        }
    })   
})

signUpLogInRouter.get('/', (req, res, next) =>{
    res.send(login);
});

signUpLogInRouter.put('/logOut', (req, res, next) =>{
    login.loggedIn = false;
    login.customerInfo = '';
});

signUpLogInRouter.get('/logIn', passport.authenticate("local", {failureRedirect: "/"}), (req,res)=>{
    login.loggedIn = true;
    pool.query('SELECT * FROM customers WHERE email = $1', [req.query.email], (err, results) =>{
        login.customerInfo = results.rows[0];
    });
    res.render("index.ejs", {user: req.user});
    //res.render("dashboard.ejs", {user: req.user})
} /*(req, res, next) =>{
    pool.query('SELECT * FROM customers WHERE email = $1', [req.query.email], (err, results) =>{
        let errors = [];
        login.customerInfo = results.rows[0];
        if(login.customerInfo.email != req.query.email) errors.push({message: "Invalid Email"});
        if(login.customerInfo.password === req.query.password){
            login.loggedIn = true;
            res.render('index.ejs');
        }else{
            errors.push({message: "Invalid Password"});
        }
        if (errors.length > 0) {
            res.send({errors});
        }
    });
}*/);

module.exports = signUpLogInRouter;