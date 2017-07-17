const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CashFlowSchema = new Schema({
    walletId: Schema.ObjectId,
    amount: Number,
    text: String,
    date: Date
})

module.exports = mongoose.model('CashFlow', CashFlowSchema);
