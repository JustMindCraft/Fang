var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const DocumentSchema = new mongoose.Schema({
    name: String,
    ipfsHash: String,
    magnetHash: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const Document = mongoose.model('Document', DocumentSchema);

export default  Document;