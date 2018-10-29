import loki from 'lokijs'

async function dbInited(){
    return await new Promise((resolve, reject) => {
        let dbinitCallBack = (db) => {
            resolve(db);
         }
         try {
            let db = new loki("lokidata/loki.db", {
            
                autoload: true,
                autoloadCallback: () => dbinitCallBack(db),
                autosave: true, 
                autosaveInterval: 4000
            });
           
             
         } catch (error) {
            reject(error)
         }
        
       
       
     });
}




export default class LokiInstance {

   constructor(){

       this.db = null;
       dbInited().then(rlt => {
           this.db = rlt;
           
       })
   }
   

  

    async insert(params, modelName){

            let collection =  this.db.addCollection(modelName);
            try {
                return   collection.insert(params);
                
            } catch (error) {
                console.error(error);
                
            }
            
        
          
    }

    async findOne(query={}, modelName){
        
        
        let collection =  this.db.addCollection(modelName);
        
        return collection.findOne(query);
        
    }
    async find(query={}, page=1, pagesize=10, sort={}, feilds=[], modelName){
        let collection =  this.db.addCollection(modelName);
        
        return collection.find(query);
    }
}