import defaultFields from '../config/defaultFields';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AgencySchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    app: { type: Schema.Types.ObjectId, ref: 'App', default: null },
    super: { type: Schema.Types.ObjectId, ref: 'Agency', default: null },
    good: { type: Schema.Types.ObjectId, ref: 'Good', default: null },
    ...defaultFields
  });

const Agency = mongoose.model('Agency', AgencySchema);

export default  Agency;