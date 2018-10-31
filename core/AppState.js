import loki from 'lokijs'

export default class AppState{
    constructor(params){
        try {
            this.initParams = params;
            this.db = new loki("state.db");
            this.collection = this.db.addCollection('states');
            
            
            this.state = this.collection.insert(params);

            console.log("状态是否被读取", this.state);
            
           

         } catch (error) {
            console.error(error);
            
         }
    }
   
    set(params){
        this.collection.update(this.state, {$set: params});
        return this.collection.findOne(this.state);
    }
    reset(){
        this.collection.remove(this.state);
        this.collection.insert(this.initParams);
        this.state = this.collection.findOne(this.initParams);
        return this.state;
    }
}