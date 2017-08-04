const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const walletsRoutes = require('./app/routes/wallets');
const cashFlowRoutes = require('./app/routes/cash-flows');


app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use((req, res, next) => {
    mongoose.connect('mongodb://heroku_6lz4v5qs:d*vPg9cHwwQNT7FXpDq#@ds143542.mlab.com:43542/heroku_6lz4v5qs', (err) => {
        if (err) {
            res.status(500).send({errorMessage: 'Cannot connect to database', error: err});
        }
        next();
    })
});



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
});


app.use('/api/wallets', walletsRoutes);
app.use('/api/cash-flows', cashFlowRoutes);

app.listen(port);
