const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CashFlowSchema = new Schema({
    walletId: Schema.ObjectId,
    amount: Number,
    text: String,
    date: Date
})

WalletSchema.set('toJSON', {
    versionKey: false,
    transform:(doc, ret) => {ret.id = doc._id; delete ret._id}
})

module.exports = mongoose.model('CashFlow', CashFlowSchema);
