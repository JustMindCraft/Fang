import AppModel from '../core/model';

export default class Temp extends AppModel {
    constructor(feilds){
        super(feilds);
        this.validFields({
           temp:Temp
        })
    }
}