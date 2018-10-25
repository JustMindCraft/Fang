
import AppModel from '../core/model';


import Comment from './model';

import User from './model';


export default class Post extends AppModel {
    constructor(feilds){
        super(feilds);
        this.validFields({
            
            title: String,
        
            body: String,
        
            hasMany: Comment,
        
            belongsTo: User,
        
        })
    }
}

