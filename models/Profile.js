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
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  });

const Post = mongoose.model('Profile', ProfileSchema);

export default  Post;