import AppModel from '../core/model';
import Tag from './Tag';

export default class Admin extends AppModel {
    constructor(fileds){
        super(fileds);
        
        this.validFields({
            username: String,
            hasMany: Tag,
        })
    }
    
    
    static findOne(){
        console.log('findone');
        
    }
    findNew(){
        console.log('findNew');
        
    }
}