
import AppModel from '../core/model';


import Tag from './Tag.js';

import User from './User.js';


export default class Post extends AppModel {
    constructor(feilds){
        super(feilds, Post);
        this.validFields({
            
            title: [String,{required: true, minLength: 10}],
        
            body: String,
        
            hasMany: Tag,
        
            belongsTo: User,
        
        })
    }
}

