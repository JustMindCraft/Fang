
import AppModel from '../core/model';



export default class New extends AppModel {
    constructor(feilds){
        super(feilds);
        this.validFields({
            
            title: String,
        
            BelongsTo: User,
        
        })
    }
}

