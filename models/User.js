
import AppModel from '../core/model';
import Post from './Post';



export default class User extends AppModel {
    constructor(feilds){
        super(feilds, User);
        this.validFields({
            
            username: [String, {required: true}],
            password: [String, {required: true}],
            hasMany: Post
        
        })
    }
}

