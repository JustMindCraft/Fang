import config from '../config/index';
import MongoInstance from './MongoInstance';
import PgsqlInstance from './PgsqlInstance';
import LokiInstance from './LokiInstance';
import UUID from 'uuid/v4'
var Inflector = require('inflected');

let db = null
if(config.db.driver === 'mongodb'){
    db = new MongoInstance();
    db.connect(config);
}
if(config.db.driver === 'pgsql'){
    db  = new PgsqlInstance();
    db.connect(config);
}
if(config.db.driver === 'level'){
    db = new LevelInstance(this.name);
}


if(config.db.driver === 'loki'){
    db = new LokiInstance();

}

 class AppModel {
     constructor(feilds, child){
         
         this.innerProperties = {};
         this.innerProperties.modelName = child.name;
         this.innerProperties.db = null;
         this.innerProperties.feilds = {};

         let modelFeilds = feilds;
         if(!modelFeilds.createdAt){
             modelFeilds.createdAt = new Date();
             modelFeilds.id = UUID();
         }
         Object.keys(modelFeilds).forEach(key => {
             this[key] = modelFeilds[key];
         })
     }

     async dealHasMany(){
        let innerFeilds = this.innerProperties.feilds
            
           if(innerFeilds.hasMany){
               let query = {};
               query[this.innerProperties.modelName.toString().toLowerCase()+"Id"] = this.id;

               
               let items = await innerFeilds.hasMany.find(query);
               
               let key  = Inflector.pluralize(innerFeilds.hasMany.name.toLowerCase());
               //转化小写以及单复数
               
               this[key] = items;
           }
     }
        
     async validFields(feilds){
         this.innerProperties.feilds = feilds;
         await this.dealHasMany();
         
     }
    
    static  one(query={}){
        return db.findOne(query, this.name);
        
    }
    async save(){
        await this.dealHasMany();
        let paramsToInsert = {};
        Object.getOwnPropertyNames(this).forEach(key => {
            if(key !== 'innerProperties'){
                
                paramsToInsert[key] = this[key];
            }
        });
        
        try {
            return   await db.insert(paramsToInsert, this.innerProperties.modelName);
            
        } catch (error) {
            console.log("插入新数据错误", error);
            
        }
        
    }
    static find(query={}, sort={createdAt: -1}, page=0, pagesize=10){
        return db.find(query);
        
    }
}

export default AppModel;