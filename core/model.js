import config from '../config/index';
import MongoInstance from './MongoInstance';
import PgsqlInstance from './PgsqlInstance';
import LevelInstance from './LevelInstance';
var Inflector = require('inflected');


 class AppModel {
     constructor(feilds){
         let modelFeilds = feilds;
         if(!modelFeilds.createdAt){
             modelFeilds.createdAt = new Date();
         }
         Object.keys(modelFeilds).forEach(key => {
             this[key] = modelFeilds[key];
         })

        

         
        
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
        if(config.db.driver === 'mongodb'){
            this.db = new MongoInstance();
            this.db.connect(config);
        }
        if(config.db.driver === 'pgsql'){
            this.db  = new PgsqlInstance();
            this.db.connect(config);
        }
        if(config.db.driver === 'level'){
            this.db = new LevelInstance();
        }
        
       
    }
    static one(query={}){
        return this.db.findOne(query);
    }
    save(){
        console.log("即将存储");
        
    }
    static find(query={}, sort={createdAt: -1}, page=0, pagesize=10){
        console.log("这个的模型名称是", this.name);
        
        console.log('此处查找很多');
        return [1,2,3,4];
        
    }
}
AppModel.initConnect();

export default AppModel;