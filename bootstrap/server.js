/* 
* @Author: Simontao
* @Date:  2018-10-25 16:27:05
* @Last Modified by:   2018-10-25 16:27:07
*/

import server from '../core/server';

import  '../controllers';

import models from '../models';

import AppModel from '../core/model';

//注册所有的models

models.forEach(model => {
    AppModel.modelName = model.name;
})



const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();