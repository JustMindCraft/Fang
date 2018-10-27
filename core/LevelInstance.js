import uuidv4 from 'uuid/v4';

import  levelup from 'levelup';
import  leveldown from 'leveldown';


export default class LevelInstance{
    constructor(){
      
    }

    async checkModelNameOrCreateOne(modelName){
        let model = await db.get(modelName )
    }

    async checkFieldExistOrCreateSome(modelName, modelFeild){
        //检查字段是否已经存在, 若是不存在就创建
        let feilds = await db.get(modelName)
    }

    async insert(modelName, modelFeild){
        let uuid = uuidv4();
        let db = levelup(leveldown('./leveldata/'+modelName))
        try {
            //把字段都取出来，
            return await db.put(uuid, modelFeild);
            
        } catch (error) {
            console.error(error);
            process.exit(1);
            
        }
    }

    async fineOne(query={}){
        let db = levelup(leveldown('./leveldata/'+modelName));
        db.get("")
        
    }
}