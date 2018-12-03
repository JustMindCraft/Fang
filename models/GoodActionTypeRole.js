var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodActionTypeRoleSchema = new mongoose.Schema({
    good: { type: Schema.Types.ObjectId, ref: 'Good' },
    actionType: String,
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const GoodActionTypeRole = mongoose.model('GoodActionTypeRole', GoodActionTypeRoleSchema);

export default  GoodActionTypeRole;