const express = require('express');
const router = express.Router();
const CashFlow = require('../models/cash-flow');

router.route('/:walletId')
    .post((req, res) => {
        let cashFlow = new CashFlow();
        cashFlow.walletId = req.params.walletId;
        cashFlow.amount = req.body.amount;
        cashFlow.text = req.body.text;
        cashFlow.date = req.body.date;

        cashFlow.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json(cashFlow)
        })
    })
    .get((req, res) => {
        CashFlow.find({walletId:req.params.walletId}, (err, cashFlows) => {
            if (err) {
                res.status(404).send({errorMessage: 'Cannot find wallets', error: err});
            }
            res.json(cashFlows)
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
                if (err) {
                    res.send(err);
                }
                res.json(cashFlow);
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
            res.send(cashFlow)
        })
    })
module.exports = router;
