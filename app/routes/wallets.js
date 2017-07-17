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
    .get((req, res) => {
        Wallet.find((err, wallets) => {
            if (err) {
                res.send(err);
            }
            res.json(wallets)
        })
    })

router.route('/:id')
    .get((req, res) => {
        Wallet.findById(req.params.id, (err, wallet) => {
            if (err) {
                res.send(err);
            }
            res.json(wallet);
        })
    })
    .put((req, res) => {
        Wallet.findById(req.params.id, (err, wallet) => {
            if (err) {
                res.send(err);
            }
            wallet.name = req.body.name;
            console.log(req.body.amount);
            wallet.currentAmount = wallet.currentAmount + req.body.amount;

            wallet.save((err) => {
                res.send(err);
            })
        })
    })

module.exports = router;
