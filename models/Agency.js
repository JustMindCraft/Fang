var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AgencySchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    super: { type: Schema.Types.ObjectId, ref: 'Agency' },
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
  });

const Agency = mongoose.model('Agency', AgencySchema);

export default  Agency;