import { gun, Gun } from './gun.js';
import Joi from 'joi'
const  Inflector = require('inflected');

export default class GunInstance{
    static async put(model, instance){

        let schema = model.setFeilds();
        schema.id = Joi.string().min(5).required();
        schema.created = Joi.date();
        
       

        if(!instance.created){
            instance.created = new Date(Gun.state()).getTime();
        }
        if(!instance.id){
            instance.id = require('uuid/v4')();
            
        }
        
        const result = Joi.validate(instance, schema);
        
        if(result.error){
            console.log(result.error.details);
            
            return result.error;
        }else{

            return new Promise((resolve, reject)=>{
                gun.get('root').get(model.collection).put(instance, async ack =>{
                    if(!ack.err){
                         Object.getOwnPropertyNames(instance).forEach(async key=>{
                             try {  
                               
                                resolve(new model(instance));
                             } catch (error) {
                                 reject(error);
                             }
                         })
                         
                    }
                     
                 })

            })
           
           
            
        }
        
        
        
    }
}