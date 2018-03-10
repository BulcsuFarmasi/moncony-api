const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    role: String
})

CashFlowSchema.set('toJSON', {
    versionKey: false,
    transform:(doc, ret) => {ret.id = doc._id; delete ret._id}
})

module.exports = mongoose.model('User', UserSchema);