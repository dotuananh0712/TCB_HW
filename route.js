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
    // Example empty pool
    const myDB = {}

    if (myDB.Data.poolID === req.body.poolID){
        const asc = (arr) => arr.sort((a, b) => a - b);

        const quantile = (arr, p) => {
            
            const q = (p > 1) ? p / 100 : p //percentile to quantile
            
            const sorted = asc(arr);
            const pos = (sorted.length - 1) * q;
            const base = Math.floor(pos);
            const rest = pos - base;

            if (sorted[base + 1] !== undefined) {
                return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
            } else {
                return sorted[base];
            }
        };

        const message = {
            'quantile' : quantile(myDB.Data.poolValues, req.body.percentile),
            'total_items': _.keys(myDB.Data.poolValues).length 
        }
        res.json(message)
    }
    else {
        res.status(400).send("Unable to Locate Pool" + req.body.poolID)
    }
});

module.exports = myRoutes;