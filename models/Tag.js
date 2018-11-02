
import AppModel from '../core/model';


import Post from './Post.js';


export default class Tag extends AppModel {
    static setFeilds(){
        return {
            name: "VARCHAR(20)",
        
            hasMany: Post,
            belongsTo: Post
        }
    }
    constructor(feilds){
        super(feilds);
        this.validFields({
            
            name: String,
        
            hasManyAndBelongsTo: Post,
        
        })
    }
}

