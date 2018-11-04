
import AppModel from '../core/model';


import Tag from './Tag.js';

import User from './User.js';

import Joi from 'joi';

export default class Post extends AppModel {
    
    static setFeilds(){
        return {
            title: Joi.string().max(50).required(),
        
            body: Joi.string().min(20).required(),
        
        }
    }

    static setFeildReferences(){
        return {
            title: 'unique'
        }
    }

    static setRelations(){
        return {
            hasMany: Tag,
        
            belongsTo: [User, Tag],

        }
    }
    
}

