const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    name: String,
    currentAmount: Number
});

WalletSchema.set('toJSON', {
    versionKey: false,
    transform:(doc, ret) => {ret.id = doc._id; delete ret._id}
})

module.exports = mongoose.model('Wallet', WalletSchema);


