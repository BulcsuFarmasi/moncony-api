const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const walletsRoutes = require('./app/routes/wallets');
const cashFlowRoutes = require('./app/routes/cash-flows');


app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use((req, res, next) => {
    mongoose.connect('mongod://heroku_rs0q70x0:f26655akin66bbd03rigf5b07@ds115573.mlab.com:15573/heroku_rs0q70x0')
    then(() => {next()},
        () => {res.status(500).send('Can\'t connect to database')});
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
