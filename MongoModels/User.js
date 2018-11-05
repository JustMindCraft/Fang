import Joi from 'joi';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

export const UserValidSchema = {
    username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),

    email: Joi.string().email({ minDomainAtoms: 2 }),

    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password_repeat: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
}

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
    password: String,
    password_repeat: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
  });



  const User = mongoose.model('User', UserSchema);

  export async function auth(userparams, password){
    let user = await User.findOne({email: userparams, password});
    if(!user){
      user = await  User.findOne({email: userparams, password});
      if(!user){
        return 404
      }else{
        return user;
      }
    }

  }

  export default  User;