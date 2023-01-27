const express = require('express');
const app = express();
const {client} = require('./db.js');
const path = require("path");

app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false})); //Allow for taking in information from submitted forms and allowing node.js to access the info within the req object
app.use(express.json());
app.set("view-engine", "ejs");

app.get("/", (req, res, next) =>{
    res.sendFile("index.html");
});

app.get("/signInFailure", (req, res, next) =>{
    res.render("signInFailure.ejs");
})


//Registration Code
const bcrypt = require("bcrypt");

app.post("/signUp", async (req, res) =>{
    client.query("SELECT * FROM customers WHERE email = $1", [req.body.email], async(err, results) =>{
        let errors = [];
        if(err) console.log(err);
        if(results.rows.length > 0) errors.push({message: "Email is already registered"});
        if(errors.length > 0){
            res.render("signUp.ejs", {errors});
        }else{
            let securedPassword = null;
            try{
                const salt = await bcrypt.genSalt(10);
                securedPassword = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                console.log(err);
            }
            const newCustomer = await client.query("INSERT INTO customers (password, email, first_name, last_name) VALUES($1, $2, $3,$4)", [securedPassword, req.body.email, req.body.firstName, req.body.lastName]);
            if(newCustomer){
                res.sendFile(path.join(__dirname, "public", "signUpConfirm.html"));
            }else{
                res.status(500).json({msg:"New User Creation Unsuccessful"});
                //Add a redirect to a page letting customer know that the registration failed
            }
        }
    })
});
//End of Registration Code

/*
//Passport Configuration Youtube
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("express-flash");
const session = require("express-session");
const store = new session.MemoryStore();

function initializePassport(passport, getUserByEmail, getUserById){
    const authenticateUser = async (email, password, done) =>{
        const user = getUserByEmail(email);
        if(user === null){
            return done(null, false, { message: "No user with that email" });
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }else{
                return done(null, false, { message: "Password Invalid" });
            }
        }catch(err){
            return done(err);
        }
    }

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) =>{
        return done(null, getUserById(id));
    });
}

async function getUserByEmail(email){
    const result = await client.query("SELECT * FROM customers WHERE email = $1", [email]);
    const userEmail = result.rows[0];
    return userEmail;
}

async function getUserById(id){
    const result = await client.query("SELECT * FROM customers WHERE id = $1", [id]);
    const userId = result.rows[0];
    return userId;
}

initializePassport(passport, getUserByEmail, getUserById);

app.use(flash());
app.use(
    session({
      secret: "f4z4gs$Gcg",
      cookie: { maxAge: 300000000, secure: false },
      saveUninitialized: false,
      resave: false,
      store,
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.post("/logIn", passport.authenticate("local", {successRedirect: "passportworks.html", failureRedirect: "/pageRouter/signIn", failureFlash: true }));
//End of Passport Configuration
*/



/*
//Passport Configuration Codecademy
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("express-flash");
const session = require("express-session");
const store = new session.MemoryStore();

app.use(flash());
app.use(
    session({
      secret: "f4z4gs$Gcg",
      cookie: { maxAge: 300000000, secure: false },
      saveUninitialized: false,
      resave: false,
      store,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser((id, done) =>{
    const result = client.query("SELECT * FROM customers WHERE email = $1", [id]);
    const user = result.rows[0];
    if(err) return done(err);
    done(null, user);
});


passport.use(new LocalStrategy(async function(email, password, done){
    const result = null;
    const user = null;   
    try{
        result = await client.query("SELECT * FROM customers WHERE email = $1", [email]);
        user = result.rows[0];
    }catch(err){
    //DB lookup error    
        return done(err);
    }
    //User not found
    if(!user) return done(null, false, { message: "No user with that email" });
    //User found, password valid
    const matchedPassword = await bcrypt.compare(password, user.password);
    if(matchedPassword) return done(null, user);
    //Password invalid
    return done(null, false, { message: "Password invalid" });
    })
);

app.post("/logIn", passport.authenticate("local", {successRedirect: "passportworks.html", failureRedirect: "/pageRouter/signIn", failureFlash: true }), (req, res, next) =>{
    res.redirect("/");
});

app.get("/profile", (req, res) => {
    if(req.isAuthenticated()){
        res.send({
            id: req.id,
            email: req.email,
            firstName: req.first_name,
            lastName: req.last_name
        });
    }
});

app.get("/logout", (req, res) =>{
    req.logout();
    res.redirect("/");
});
//End of passport configuration Codecademy
*/



//Yet another passport implementation
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("express-flash");
const session = require("express-session");
const store = new session.MemoryStore();

app.use(flash());
app.use(
    session({
      secret: "f4z4gs$Gcg",
      cookie: { maxAge: 300000000, secure: false },
      saveUninitialized: false,
      resave: false,
      store,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy( {usernameField: "email"}, (email, password, done) =>{
    client.query("SELECT * FROM customers WHERE email = $1", [email], async (err, results)=>{
        
        if(err) return done(err);
        
        const user = results.rows[0];
        if(!user) return done(null, false, { message: "Email is not registered" });
        
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) return done(null, false, { message: "Invalid Password" });

        return done(null, user);
        });
    })
); 

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    client.query("SELECT * FROM customers WHERE id=$1", [id], async(err, results)=>{
        if(err) return done(err);
        user = results.rows[0];
        done(null, user);
    });
});

app.post("/logIn", passport.authenticate("local", {successRedirect: "/", failureRedirect: "/pageRouter/signIn", failureFlash: true }));

app.get("/profile", (req, res) => {
    if(req.isAuthenticated()){
        res.send({user: req.user});
    }
});

app.get("/logOut", (req, res, next) =>{
    req.logout();
    res.redirect("/");
})
//End of yet another passport implementation


/*
//My stupid log in code
app.post("/logIn", async (req, res, next) =>{
    const password = req.body.password;
    const email = req.body.email;

    console.log(password + email);
  
    try{
      const result = await client.query("SELECT * FROM customers WHERE email = $1", [email]);
      const user = result.rows[0];
      console.log(user);
      if(!user){
        console.log("User does not exist!");
        return res.redirect("/pageRouter/signIn");
      }
      // Compare passwords:
      const matchedPassword = await bcrypt.compare(password, user.password);
  
      if(!matchedPassword){
        console.log("Passwords did not match!");
        return res.redirect("/pageRouter/signIn");
      }
      // return res.status(401).json({
      //   token: null,
      //   message: "Invalid password",
      // });
  
      res.sendFile(path.join(__dirname, "public", "passportworks.html"));
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//End of my stupid log in code
*/

const pageRouter = require("./routers/pageRouter");
const cartRouter = require("./routers/cartRouter.js");
const addressRouter = require("./routers/addressRouter.js");
//const signUpRouter = require("./routers/signUpRouter.js");


app.use("/pageRouter", pageRouter);

app.use("/cart", cartRouter);

app.use("/addresses", addressRouter);

//app.use("/signUpRouter", signUpRouter);




const PORT = process.env.PORT || 4001;

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
});