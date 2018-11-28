var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const StorageSchema = new mongoose.Schema({
    name: String, //同一个app内不可重名
    super:{ type: Schema.Types.ObjectId, ref: 'Storage' },
    documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    app: { type: Schema.Types.ObjectId, ref: 'App' },
  });

const Storage = mongoose.model('Storage', StorageSchema);

export default  Storage;