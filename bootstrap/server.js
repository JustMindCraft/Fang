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
const Inert = require('inert');
const Gun   = require('gun');





const JWT    = require('jsonwebtoken');
const secret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!
const people = { // our "users database"
    1: {
      id: 1,
      name: 'Jen Jones',
      scope: ["user"]
    }
};
const token = JWT.sign(people[1], secret); // synchronous
console.log(token);

// bring your own validation function
const validate = async function (decoded, request, h) {
    
    console.log(people[decoded.id].scope);
    
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return { credentials: {msg: "公钥"}, isValid: false,  scope: 'nobody'};
    }
    else {
      return { credentials: {scope: people[decoded.id].scope, msg: "公钥"}, isValid: true };
    }
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

    
    await server.start();

    server.auth.strategy('jwt', 'jwt',
    { key: secret,          // Never Share your secret key
      validate: validate,            // validate function defined above
      verifyOptions: {
        ignoreExpiration: true,    // do not reject expired tokens
        algorithms: [ 'HS256' ]    // specify your secure algorithm
      } // pick a strong algorithm
    });
  
    server.auth.default({
        strategy: 'jwt',
        scope: 'admin'
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
        path: '/{any*}',config: {  auth: false },
        handler: (request, h) => {
          const accept = request.headers.accept
            console.log(request.params);
            
          if (accept && accept.match(/json/)) {
            return Boom.notFound('Fuckity fuck, this resource isn’t available.')
          }
      
          return h.view('404', {
              title: "正觉工场|404|NOT FOUND|页面未找到"
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
                    scope: ['+admin', "!nobody"]
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

