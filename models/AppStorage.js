var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppStorageSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    storage: { type: Schema.Types.ObjectId, ref: 'Storage' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const AppStorage = mongoose.model('AppStorage', AppStorageSchema);

export default  AppStorage;