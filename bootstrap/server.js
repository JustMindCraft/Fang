/* 
* @Author: Simontao
* @Date:  2018-10-25 16:27:05
* @Last Modified by:   2018-10-25 16:27:07
*/

import server from '../core/server';
import Boom from 'boom'
import  '../controllers';
import registerControllers from '../core/registerControllers';
import controllers from '../controllers';
import loadModels from '../models';
import config from '../config/index';
import Role from '../MongoModels/Role';
import menu from '../config/menu';
import ss from '../secrects.json';

const Inert = require('inert');
const Gun   = require('gun');


let  secret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!



const JWT    = require('jsonwebtoken');

if(!ss){
    console.log("添加文件/secrects.json的main节点，填写您的密钥");
}else{
    secret = ss.main;

}
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
    console.log(request.auth);
    
    console.log(people[decoded.id].scope);
    
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

    
    console.log('uuid', request.state.uuid);
    
    return { isValid: true, credentials: {} };
};

//

const init = async () => {
    const Vision = require('vision');
    const Ejs = require('ejs');

    const db = new Gun({
        web: server.listener,
        file: 'datastore/gunblock'
    })
    if(config.db.driver !== "mongo"){
        await loadModels();
    }else{
        // getting-started.js
        var mongoose = require('mongoose');
        mongoose.connect(config.mongodb.url);
    }

    await server.register(Vision);
    
    //static
    await server.register(Inert);

    await server.register(require('hapi-auth-jwt2'));
    await server.register(require('hapi-auth-basic'));
    await server.register(require('hapi-auth-cookie'));
    
    await server.start();

    server.auth.strategy('jwt', 'jwt',
    { key: secret,          // Never Share your secret key
      validate: validate,            // validate function defined above
      verifyOptions: {
        ignoreExpiration: true,    // do not reject expired tokens
        algorithms: [ 'HS256' ]    // specify your secure algorithm
      } // pick a strong algorithm
    });
    server.auth.strategy('simple', 'basic', { validate: validateSimple });

    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', {
        password: 'password-should-be-32-characters',
        cookie: 'sid',
        redirectTo: '/login',
        isSecure: false,
        validateFunc: async (request, session) => {
            console.log("on cookie valid", request.auth);
            console.log({session});
            

            const cached = await cache.get(session.uuid);

            console.log(cached);
            
            if(!cached){
                return {
                    valid: false,
                }
            }
            const token = JWT.sign(cached.user, secret);
            let roles = ['loginedUser'];

            for (let index = 0; index < cached.user.roles.length; index++) {
                const role = cached.user.roles[index];
                let roleObj = await Role.findById(role);
                roles.push(roleObj.name);
                
            }

            console.log({roles});
            

            let out =  {
                valid: true,
                credentials:{
                    token,
                    scope: roles,
                }
            };
            console.log("roles", out.credentials.scope);
            
            return out;
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

    server.views({
        engines: { ejs: Ejs },
        relativeTo: __dirname,
        path: '../views'
    });
    server.route({
        method: 'GET',
        path: '/imgs/{filename}', config: {  auth: false },
        handler: {
            file: function (request) {
                
                return 'imgs/'+request.params.filename;
            }
        }
    });
   
    server.route({
        method: 'GET',
        path: '/js/{filename}', config: {  auth: false },
        handler: {
            file: function (request) {
                
                return 'js/'+request.params.filename;
            }
        }
    });
   
    server.route({
        method: 'GET',
        path: '/gun/{param*}', config: {  auth: false },
        handler: {
          directory: {
            path: "gun/",
            redirectToSlash: true,
            index: true
          }
        }
      });

    server.route({
        method: 'GET',
        path: '/css/{filename}',config: {  auth: false },
        handler: {
            file: function (request) {
                
                return 'css/'+request.params.filename;
            }
        }
    });
    server.route({  
        method: [ 'GET', 'POST' ],
        path: '/{any*}', 
        options: {
            auth: {
                strategy: 'session',
                scope: ["loginedUser"]
            }
        },
        handler: (request, h) => {
          const accept = request.headers.accept
            console.log(request.params);
            let scope = [];

            if (request.auth.credentials) {
                 scope = request.auth.credentials.scope;
            }

            let render_menu = menu(scope); 
            
            
          if (accept && accept.match(/json/)) {
            return Boom.notFound('Fuckity fuck, this resource isn’t available.')
          }
      
          return h.view('404', {
              title: "正觉工场|404|NOT FOUND|页面未找到",
              menu: render_menu,
          })
        }
      })

      registerControllers(server, controllers);
      server.route(
        {
            method: 'GET', path: '/restricted',
            handler: function(request, h) {
                console.log(request.auth);
                
              const response = h.response({text: 'You used a Token!'});
              response.header("Authorization", request.headers.authorization);
              return response;
            },
            options: {
                auth: {
                    strategy: 'jwt',
                    scope: ['+admin', "!nobody", "+user"]
                }
            }
          }
    )
    server.events.on('request', (request, h) => {
        // console.log(request.path, request.auth);
    });
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

