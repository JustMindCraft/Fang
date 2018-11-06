
import AppModel from '../core/model';
import User from './User';
import Tag from './Tag'
import Joi from 'joi';



export default class New extends AppModel {
    static setFeilds(){
        return {
            title: Joi.string().max(50).required(),
        
            body: Joi.string().min(20).required(),
        
        }
    }

    static setRelations(){
        return {
            hasMany: Tag,

        
            belongsTo: [User, Tag],

        }
    }
}

