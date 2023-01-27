const express = require("express");
const {pool} = require('../db.js');

const addressRouter = express.Router();

addressRouter.get("/", (req, res, next) =>{
    pool.query('SELECT * FROM addresses WHERE id = $1', [req.query.id], (err, results) =>{
        if(err){
            console.log(err);
        }else{
            const addresses = results.rows[0];
            res.send(addresses);
        }
    });
});

addressRouter.post("/", (req, res, next) =>{
    const id = req.body.id;
    const addressConcatenated = req.body.street + ", " + req.body.city + ", " + req.body.state + " " + req.body.zipcode; 
    let currentAddresses = null;
    pool.query('SELECT * FROM addresses WHERE id = $1', [id], (err, results) =>{
        if(err){
            console.log(err);
        }else{
            const currentAddresses = results.rows[0];
            for(let [key, value] of Object.entries(currentAddresses)){
                if(value === null){
                    switch(key){
                        case "address1":
                            pool.query('UPDATE addresses SET address1 = $1 WHERE id = $2', [addressConcatenated, id]);
                            break;
                        case "address2":
                            pool.query('UPDATE addresses SET address2 = $1 WHERE id = $2', [addressConcatenated, id]);
                            break;
                        case "address3":
                            pool.query('UPDATE addresses SET address3 = $1 WHERE id = $2', [addressConcatenated, id]);
                            break;
                        case "address4":
                            pool.query('UPDATE addresses SET address4 = $1 WHERE id = $2', [addressConcatenated, id]);
                            break;
                        case "address5":
                            pool.query('UPDATE addresses SET address5 = $1 WHERE id = $2', [addressConcatenated, id]);
                            break;
                    }
                    res.render("account.ejs");
                    break;
                }else{
                    continue;
                }
            }
        }
    });
});

addressRouter.delete("/", (req, res, next) =>{
    const address = req.query.address;
    switch(address){
        case "address1":
            pool.query('UPDATE addresses SET address1 = NULL WHERE id = $1', [req.query.id]);
            break;
        case "address2":
            pool.query('UPDATE addresses SET address2 = NULL WHERE id = $1', [req.query.id]);
            break;
        case "address3":
            pool.query('UPDATE addresses SET address3 = NULL WHERE id = $1', [req.query.id]);
            break;
        case "address4":
            pool.query('UPDATE addresses SET address4 = NULL WHERE id = $1', [req.query.id]);
            break;
        case "address5":
            pool.query('UPDATE addresses SET address5 = NULL WHERE id = $1', [req.query.id]);
            break;
    }
});


module.exports = addressRouter;