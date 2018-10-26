
import AppModel from '../core/model';



export default class User extends AppModel {
    constructor(feilds){
        super(feilds);
        this.validFields({
            
            username: String,
        
        })
    }
}

