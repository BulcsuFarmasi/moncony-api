const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.route('/')
    .post((req, res) => {
        bcrypt.hash(req.body.password, 9, (err, hash) => {
            if (err) {
                res.status(500).json({
                    message: 'Could not create user',
                    error:err
                })
            }
            res.status(200).json({
                uri: process.env.MONGODB_URI
            })
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    message: 'User created'
                })
            })
            .catch(err => {
                console.log(err)
                if (err) {
                    res.status(500).json({
                        message: 'Could not create user',
                        error:err
                    })
                }
            })
        })
    })
module.exports = router;   