var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const DocumentSchema = new mongoose.Schema({
    name: String,
    ipfsHash: String,
    magnetHash: String,
    storage:{ type: Schema.Types.ObjectId, ref: 'Storage' }
  });

const Document = mongoose.model('Document', DocumentSchema);

export default  Document;