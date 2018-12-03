var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserProfileSchema = new mongoose.Schema({
    profile: { type: Schema.Types.ObjectId, ref: 'Profile'},
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: String,//用户订单的状态和订单的状态不一样，是订单状态的子集
  });

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

export default  UserProfile;