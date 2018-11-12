const  Inflector = require('inflected');

import { gun } from './gun.js';
export default async function createGunRoots(model){
    let usersObj = {};
    usersObj[model.collection] = {};
    model.relations = model.setRelations();
    let putPromise = new Promise((res,rej)=>{
        gun.get('root2').put(usersObj, ack => {
            res(ack);
            
        })
    })
    model.node = gun.get('root').get(model.collection);
    return await putPromise;
    
}