
import AppModel from '../core/model';
import User from './User';



export default class New extends AppModel {
    static setFeilds(){
        return {
            title: "VARCHAR(20)",
        
            belongsTo: User,
        }
    }
    constructor(feilds){
        super(feilds);
        this.validFields({
            
            title: String,
        
            BelongsTo: User,
        
        })
    }
}

