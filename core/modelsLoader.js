import config from '../config'
import createPgTables from './createPgTables';
const  Inflector = require('inflected');

export default async function modelsLoader(models){
    models.forEach( async model => {
        let collection =  Inflector.pluralize(model.name.toLowerCase());

        model.collection = collection;

        if(config.db.driver === 'gunjs'){
            // get the client
            console.log('使用gunjs');
            model.findOne = function(query){

            }
            
         
        }

        if (config.db.driver === 'pg') {
            await createPgTables(model);            
        }

         //建立好表之后应该开始为模型创建内置方法

         model.findOne = async (query={}) =>{
            console.log("findOne");
            
        }

        model.create = async (params={}) => {
            //插入数据表

        }

        model.find　= async (query={},sort={}, page={}, pagesize={},  fields=[]) => {

        }

        model.doSql = async (sql='') => {

        }

        
        model.prototype.save = async function(){
            
            console.log('save2', this.title);
            
        }

        model.prototype.delete = async function(){
            console.log("delete", this.title);
            
        }
        
        
        
    });
}