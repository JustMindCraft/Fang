
import AppModel from '../core/model';


import Tag from './Tag.js';

import User from './User.js';


export default class Post extends AppModel {
    
    static setFeilds(){
        return {
            title: "VARCHAR(20)",
        
            body: "TEXT",
        
            hasMany: Tag,

        
            belongsTo: [User, Tag],
        }
    }
    
}

