const express = require("express");
const {pool, client} = require('../db.js');

const cartRouter = express.Router();

cartRouter.get("/", (req, res, next) =>{
   pool.query('SELECT * FROM cart WHERE id = $1', [req.query.id], (err, results) =>{
    if(err){
        console.log(err);
    }else{
        const cartInfo = results.rows[0];
        res.send(cartInfo);
    }
   });
});

cartRouter.post("/", (req, res, next) =>{
    client.query("SELECT * FROM cart WHERE id = $1", [req.query.id])
    const shell = req.query.shell;
    let cart = {};
    cart[shell] = value;
});





cartRouter.post("/", (req, res, next) =>{
    const shell = req.query.shell;
    switch(shell){
        case "conch":
            pool.query('UPDATE cart SET conch = conch + 1 WHERE id = $1', [req.query.id]); 
            break;
        case "brokenHeart":
            pool.query('UPDATE cart SET brokenheart = brokenheart + 1 WHERE id = $1', [req.query.id]);
            break;
        case "oceansWail":
            pool.query('UPDATE cart SET oceanswail = oceanswail + 1 WHERE id = $1', [req.query.id]); 
            break;
        case "tinyTitan":
            pool.query('UPDATE cart SET tinytitan = tinytitan + 1 WHERE id = $1', [req.query.id]); 
            break;
        case "sailorsBounty":
            pool.query('UPDATE cart SET sailorsbounty = sailorsbounty + 1 WHERE id = $1', [req.query.id]); 
            break;
        case "whitePrincess":
            pool.query('UPDATE cart SET whiteprincess = whiteprincess + 1 WHERE id = $1', [req.query.id]); 
            break;
    }
    console.log(shoppingCart);
});

cartRouter.delete("/", (req, res, next) =>{
    const shell = req.query.shell;
    switch(shell){
        case "conch":
            pool.query('UPDATE cart SET conch = 0 WHERE id = $1', [req.query.id]);
            break;
        case "brokenHeart":
            pool.query('UPDATE cart SET brokenheart = 0 WHERE id = $1', [req.query.id]);
            break;
        case "oceansWail":
            pool.query('UPDATE cart SET oceanswail = 0 WHERE id = $1', [req.query.id]);
            break;
        case "tinyTitan":
            pool.query('UPDATE cart SET tinytitan = 0 WHERE id = $1', [req.query.id]);
            break;
        case "sailorsBounty":
            pool.query('UPDATE cart SET sailorsbounty = 0 WHERE id = $1', [req.query.id]);
            break;
        case "whitePrincess":
            pool.query('UPDATE cart SET whiteprincess = 0 WHERE id = $1', [req.query.id]);
            break;
    }
});

cartRouter.put("/", (req, res, next) =>{
    const shell = req.query.shell; 
    switch(shell){
        case "conch":
            pool.query('UPDATE cart SET conch = $1 WHERE id = $2', [req.query.quantity, req.query.id]);
            break;
        case "brokenHeart":
            pool.query('UPDATE cart SET brokenheart = $1 WHERE id = $2', [req.query.quantity, req.query.id]);
            break;
        case "oceansWail":
            pool.query('UPDATE cart SET oceanswail = $1 WHERE id = $2', [req.query.quantity, req.query.id]);
            break;
        case "tinyTitan":
            pool.query('UPDATE cart SET tinytitan = $1 WHERE id = $2', [req.query.quantity, req.query.id]);
            break;
        case "sailorsBounty":
            pool.query('UPDATE cart SET sailorsbounty = $1 WHERE id = $2', [req.query.quantity, req.query.id]);
            break;
        case "whitePrincess":
            pool.query('UPDATE cart SET whiteprincess = $1 WHERE id = $2', [req.query.quantity, req.query.id]);
            break;
    }
});

module.exports = cartRouter;