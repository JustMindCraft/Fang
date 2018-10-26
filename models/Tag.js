
import AppModel from '../core/model';


import Post from './Post.js';


export default class Tag extends AppModel {
    constructor(feilds){
        super(feilds);
        this.validFields({
            
            name: String,
        
            hasManyAndBelongsTo: Post,
        
        })
    }
}

