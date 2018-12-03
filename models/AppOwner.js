var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppOwnerSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const AppOwner = mongoose.model('AppOwner', AppOwnerSchema);

export default  AppOwner;