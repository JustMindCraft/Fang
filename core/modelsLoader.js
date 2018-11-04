import config from '../config'
import createPgTables from './createPgTables';
import createGunRoots from './createGunRoots';
import GunInstance from './GunInstance';
const  Inflector = require('inflected');

export default async function modelsLoader(models){
    models.forEach( async model => {
        let collection =  Inflector.pluralize(model.name.toLowerCase());

        model.collection = collection;

        if(config.db.driver === 'gunjs'){ 
            await createGunRoots(model);
        }

        if(config.db.driver === 'sqlite'){

        }

        if (config.db.driver === 'pg') {
            await createPgTables(model);            
        }

         //建立好表之后应该开始为模型创建内置方法

         model.findOne = async (query={}) =>{
            console.log("findOne");
            
        }
        model.prototype.save = async function(){
            
            if(config.db.driver==="gunjs"){
                console.log(this);
                
                return await GunInstance.put(model, this);
            }
            
        }

        model.prototype.delete = async function(){
            console.log("delete", this.title);
            
        }

        model.create = async (params={}) => {
            
            //插入数据表
            let instance = new model(params);

            // instance.save();
            
            if(config.db.driver==="gunjs"){
                return await GunInstance.put(model, instance);
            }

        }

        model.find　= async (query={},sort={}, page=1, pagesize=10,  fields=[]) => {

        }

        model.doSql = async (sql='') => {

        }

        
        
        
    });
}