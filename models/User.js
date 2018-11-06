
import AppModel from '../core/model';
import Post from './Post';
import New from './New';
import Joi from 'joi';


export default class User extends AppModel {
    static setFeilds(){
        return {
            username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        
            email: Joi.string().email({ minDomainAtoms: 2 }),

            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        
        }
    }
    static setRelations(){
        return {
            hasMany: [Post, New],

        }
    }

   
}

