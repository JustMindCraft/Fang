/* 
* @Author: Simontao
* @Date:  2018-10-25 16:27:05
* @Last Modified by:   2018-10-25 16:27:07
*/

import server from '../core/server';
import config from '../config/index';
import Role from '../models/Role.js';
import apis from '../api';
import { setDefaultApp } from '../models/App';

const Inert = require('inert');
const HapiSwagger = require('hapi-swagger');

const swaggerOptions = {
    info: {
            title: 'FangAPI文档',
            version: '0.1.0',
        },
    };

let  secret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!



const JWT    = require('jsonwebtoken');


const people = { // our "users database"
    1: {
      id: 1,
      name: 'Jen Jones',
      scope: ["user","admin"]
    }
};
const token = JWT.sign(people[1], secret); // synchronous

console.log(token);


// bring your own validation function
const validate = async function (decoded, request, h) {
    
    
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return { credentials: {msg: "公钥"}, isValid: false,  scope: 'nobody'};
    }
    else {
      return { credentials: {scope: people[decoded.id].scope, msg: "公钥"}, isValid: true };
    }
};
const users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

const validateSimple = async (request)=> {

    
    
    return { isValid: true, credentials: {} };
};

//

const init = async () => {
    const Vision = require('vision');
   
    if(config.db.driver !== "mongo"){
        await loadModels();
    }else{
        // getting-started.js
        var mongoose = require('mongoose');
        mongoose.connect(config.mongodb.url, { useNewUrlParser: true});
    }

    await server.register(Vision);
    
    //static
    await server.register(Inert);

    await server.register(require('hapi-auth-jwt2'));
    await server.register(require('hapi-auth-cookie'));
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    
    await server.start();

    server.auth.strategy('jwt', 'jwt',
    { key: secret,          // Never Share your secret key
      validate: validate,            // validate function defined above
      verifyOptions: {
        ignoreExpiration: true,    // do not reject expired tokens
        algorithms: [ 'HS256' ]    // specify your secure algorithm
      } // pick a strong algorithm
    });

    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', {
        password: 'password-should-be-32-characters',
        cookie: 'sid',
        redirectTo: '/login',
        isSecure: false,
        validateFunc: async (request, session) => {
            try {
                let method = request.method;
                let path = request.path;

                const cached = await cache.get(session.uuid);
                
                if(!cached){
                    return {
                        valid: false,
                    }
                }
                const token = JWT.sign(cached.user, secret);
                let roles = ['loginedUser'];
                let access = false;
                let menu = [];//准备现实的权限菜单
                
                let out =  {
                    valid: true,
                    credentials:{
                        token: access? token: null,
                        userId: cached.user._id,
                        scope: access? roles: ['loginedUser'],
                        menu,
                    }
                };
            
            return out;
            } catch (error) {
                console.log(error);
                return error;
                
            }
            
        }
    });
  
    server.auth.default({
        strategy: 'jwt',
        scope: 'admin'
      });
    
    server.state('data', {
        ttl: 24 * 60 * 60 * 1000,
        isSecure: false,
        isHttpOnly: false,
        encoding: 'base64json',
        clearInvalid: false, // remove invalid cookies
        strictHeader: true // don't allow violations of RFC 6265
    });
   
    server.route(apis);
    
   
    console.log(`Server running at: ${server.info.uri}`);
   
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

