const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    name: String,
    currentValue: Number,
    cashFlows:[
        {type: Schema.Types.ObjectId, ref: 'CashFlow'}
    ]
})

module.exports = mongoose.model('Wallet', WalletSchema);


