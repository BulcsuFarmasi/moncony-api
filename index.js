const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wallets');

const walletsRoutes = require('./app/routes/wallets');
const cashFlowRoutes = require('./app/routes/cash-flows');


const port = process.env.PORT || 8080;


app.use('/api/wallets', walletsRoutes);
app.use('/api/cashFlows', cashFlowRoutes);

app.listen(port);
console.log(`It works on port ${port}`);
