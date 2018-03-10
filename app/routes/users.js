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
            const user = new User();
            user.name = req.body.name,
            user.email = req.body.email
            user.password = hash
            user.save((err) => {
                if (err) {
                    res.status(500).json({
                        message: 'Could not create user',
                        error:err
                    })
                }
                res.status(200).json({
                    message: 'User created'
                })
            })
        })
    })