const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  pending: [{ type: String }]
}, { timestamps: true });

module.exports = Account = mongoose.model('Account', AccountSchema);
