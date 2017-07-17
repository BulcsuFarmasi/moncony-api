const express = require('express');
const router = express.Router();
const Wallet = require('../models/wallet');

router.route('/')
    .post((req, res) => {
    let wallet = new Wallet();
    wallet.name = req.body.name;
    wallet.currentAmount = req.body.currentAmount;

    wallet.save((err) => {
        res.send(err);
    })
})

module.exports = router;
