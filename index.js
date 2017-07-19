const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wallets');

const walletsRoutes = require('./app/routes/wallets');
const cashFlowRoutes = require('./app/routes/cash-flows');


app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
});


app.use('/api/wallets', walletsRoutes);
app.use('/api/cash-flows', cashFlowRoutes);

app.listen(port);
console.log(`It works on port ${port}`);
