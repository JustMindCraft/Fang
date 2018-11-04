import Joi from 'joi';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

export const UserValidSchema = {
    username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),

    email: Joi.string().email({ minDomainAtoms: 2 }),

    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
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
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
  });

  const User = mongoose.model('User', UserSchema);

  export default  User;