import mongo from 'mongodb';
import config from '../config/index';
var Inflector = require('inflected');

const mongoClient = mongo.MongoClient;

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
        if(config.db.driver === 'mongodb'){
            mongoClient.connect(config.mongodb.url, function(err, db) {
                if (err) throw err;
                console.log("数据库已创建!");
                if(self.collection){
                    console.log(self.collection);
                    
                }else{
                    console.log('此模型没有数据表');
                    
                }
                db.close();
              });
        }
        
       
    }
    static one(query={}){
        
    }
    save(){
        console.log("即将存储");
        
    }
    static find(query={}, sort={createdAt: -1}, page=0, pagesize=10){
        console.log('此处查找很多');
        return [1,2,3,4];
        
    }
}
AppModel.initConnect();

export default AppModel;