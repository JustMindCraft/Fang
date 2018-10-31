import config from '../config/index';
import MongoInstance from './MongoInstance';
import PgsqlInstance from './PgsqlInstance';
import LevelInstance from './LevelInstance';
var Inflector = require('inflected');

const db = null
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

 class AppModel {
     constructor(feilds){
         let modelFeilds = feilds;
         if(!modelFeilds.createdAt){
             modelFeilds.createdAt = new Date();
         }
         Object.keys(modelFeilds).forEach(key => {
             this[key] = modelFeilds[key];
         })
         this.toSaveFields =  modelFeilds;

         
        
     }
    validFields(feilds){
         this.feilds = feilds;
        if(this.feilds){
            console.log("是否有", this.feilds);
            
           if(this.feilds.hasMany){
               let items = this.feilds.hasMany.find();
               
               let key  = Inflector.pluralize(this.feilds.hasMany.name.toLowerCase());
               //转化小写以及单复数
               console.log(key);
               
               this[key] = items;
           }
       }
     }
    static initConnect(){
        let self = this;
        
        
       
    }
    static one(query={}){
        return this.db.findOne(query);
    }
    save(){
        console.log("即将存储");
        
    }
    static find(query={}, sort={createdAt: -1}, page=0, pagesize=10){
        console.log('此处查找很多');
        return [1,2,3,4];
        
    }
}

export default AppModel;