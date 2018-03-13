const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./app/routes/users');
const walletsRoutes = require('./app/routes/wallets');
const cashFlowRoutes = require('./app/routes/cash-flows');


app.use(bodyParser.json());

const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_fbz07mc1:752685tkfBMY25@ds055832.mlab.com:55832/heroku_fbz07mc1', {
    useMongoClient: true
});

mongoose.Promise = global.Promise;



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
});

app.use('/api/users', usersRoutes);
app.use('/api/wallets', walletsRoutes);
app.use('/api/cash-flows', cashFlowRoutes);

app.listen(port);
