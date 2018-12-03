var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ProfileSchema = new mongoose.Schema({
    sex: Object,
    birth: Object,
    mobile: Object,
    address: Object,
    signature: String,
    nickname: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const Profile = mongoose.model('Profile', ProfileSchema);

export default  Profile;