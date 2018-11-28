import Joi from 'joi';
const bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true
      },
    email: {
        type: String,
        index: true,
        unique: true
      },
    mobile: {
      type: String,
      index: true,
      unique: true,
    },
    password: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
    app: [{ type: Schema.Types.ObjectId, ref: 'App' }],
    lastLoginTime: { type: Date, default: Date.now },
    loginRecords: {type: Array, default: []},
    createdAt: { type: Date, default: Date.now },
  });



  const User = mongoose.model('User', UserSchema);

  export async function findOneWithMobileOrEmailOrUsername(mobileOrEmailOrUsername){
    if(!mobileOrEmailOrUsername){
      return null;
    }
    const user = await User.findOne({$or: [
      {username: mobileOrEmailOrUsername},
      {email: mobileOrEmailOrUsername},
      {username: mobileOrEmailOrUsername}
    ]})

    return user;
  }

  export default  User;