
import AppModel from '../core/model';


import Tag from './Tag.js';

import User from './User.js';


export default class Post extends AppModel {
    constructor(feilds){
        super(feilds);
        this.validFields({
            
            title: String,
        
            body: String,
        
            hasMany: Tag,
        
            belongsTo: User,
        
        })
    }
}

