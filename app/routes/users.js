const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
router.route('/login')
    .post((req, res) => {
        User.find({email: req.body.email})
        .exec()
        .then(users => {
            if (users.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed',
                    authSuccess: false
                })
            }
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed',
                        authSuccess: false
                    })
                }
                if (result) {
                    console.log(process.env);
                    const token = jwt.sign({
                        email: users[0].email,
                        id: users[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    });
                    return res.status(200).json({
                        message: 'Auth successful',
                        authSuccess: true,
                        id: users[0]._id,
                        token: token
                    }); 
                }
                return res.status(401).json({
                    message: 'Auth failed',
                    authSuccess: false
                })
                
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
    })
module.exports = router;   