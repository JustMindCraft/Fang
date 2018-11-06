
import AppModel from '../core/model';

import Joi from 'joi';

import Post from './Post.js';


export default class Tag extends AppModel {
    static setFeilds(){
        return {
            name: Joi.string().max(50).required(),
        }
    }
    static setRelations(){
        return {
            hasMany: Post,

        
            belongsTo: Post,

        }
    }
}

