
import AppModel from '../core/model';
import Post from './Post';



export default class User extends AppModel {
    static setFeilds(){
        return {
            username: "VARCHAR(20)",
            password: "VARCHAR(20)",
            hasMany: Post
        }
    }
    constructor(feilds){
        super(feilds, User);
        this.validFields({
            
           
        
        })
    }
}

