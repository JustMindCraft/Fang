var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const StorageDocumentSchema = new mongoose.Schema({
    storage: { type: Schema.Types.ObjectId, ref: 'Storage' },
    document: { type: Schema.Types.ObjectId, ref: 'Document' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const StorageDocument = mongoose.model('AppOwner', StorageDocumentSchema);

export default  StorageDocument;