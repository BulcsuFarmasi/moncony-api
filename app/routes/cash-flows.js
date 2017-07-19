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
            res.send(err);
        })
    })
    .get((req, res) => {
        CashFlow.find({walletId:req.params.walletId}, (err, cashFlows) => {
            if (err) {
                res.send(err);
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
            res.send(cashFlow)
        })
    })
module.exports = router;
