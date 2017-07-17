const express = require('express');
const router = express.Router();
const CashFlow = require('../models/cash-flow');

router.route('/:walletId')
    .post((req, res) => {
        console.log('a');
        let cashFlow = new CashFlow();
        cashFlow.walletId = req.params.walletId;
        cashFlow.amount = req.body.amount;
        cashFlow.text = req.body.text;
        cashFlow.date = new Date();
        console.log(cashFlow);

        cashFlow.save((err) => {
            res.send(err);
        })
    })
    .get((req, res) => {
        CashFlow.find({walletId:req.params.walletId}, (err, wallets) => {
            if (err) {
                res.send(err);
            }
            res.json(wallets)
        })
    })
router.route('/:id')
    .put((req, res) => {
        CashFlow.findById(req.params.id, (err, cashFlow) => {
            if (err) {
                res.send(err);
            }
            cashFlow.amount = req.body.amount;
            cashFlow.text = req.body.text;

            cashFlow.save((err) => {
                res.send(err);
            })
        })
    })
    .delete((req, res) => {
        CashFlow.remove({
            _id: req.params.id
        }, (err, cashFlow) => {
            if (err) {
                res.send(err);
            }
        })
    })
module.exports = router;
