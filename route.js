const express = require('express');
const myRoutes = express.Router();

// Defined first route
myRoutes.route('/first').post(function (req, res) {
    // Example empty pool
    const myDB = {}

    if (!(poolID in myDB.Data.id)){
        myDB.push(req.body)
        .then(() => {
            res.json('Pool ' + req.body.poolID + 'Inserted!')
        })
        .catch(err => {
            res.status(400).send("Unable to Insert Pool " + req.body.poolID)
        })}

    else if (myDB.Data.id  === poolID) {
        myDB.poolValues.push(req.body.poolValues)
        .then(() => {
            res.json('Pool ' + myDB.Data.id + " Appended!");
        })
        .catch(err => {
            res.status(400).send("Unable to Append Pool " + myDB.Data.id);
        });
    }
});

// Defined second route
myRoutes.route('/second').post(function(req, res){
    const myDB = {}

    if (myDB.Data.poolID === req.body.poolID){
        const message = {
            'quantile' : req.body.percentile / 100,
            'total_count': _.keys(myDB.Data).length 
        }
        res.json(message)
    }
    else {
        res.status(400).send("Unable to Locate Pool" + req.body.poolID)
    }
});

module.exports = myRoutes;