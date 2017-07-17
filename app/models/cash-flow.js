const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CashFlowSchema = new Schema({
    name: String,
    currentValue: Number,
    date: Date
})

module.exports = mongoose.model('CashFlow', CashFlowSchema);
