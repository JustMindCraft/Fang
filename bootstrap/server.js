/* 
* @Author: Simontao
* @Date:  2018-10-25 16:27:05
* @Last Modified by:   2018-10-25 16:27:07
*/

import server from '../core/server';
import Boom from 'boom'
import  '../controllers';

const JWT    = require('jsonwebtoken');
const secret = 'NeverShareYourSecret'; // Never Share This! even in private GitHub repos!
const people = { // our "users database"
    1: {
      id: 1,
      name: 'Jen Jones'
    }
};
const token = JWT.sign(people[1], secret); // synchronous
console.log(token);

// bring your own validation function
const validate = async function (decoded, request, h) {
    
    console.log(people[decoded.id]);
    
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return { credentials: null, isValid: false};
    }
    else {
      return { credentials: {good: 'good'}, isValid: true };
    }
};

const init = async () => {
    const Vision = require('vision');
    const Ejs = require('ejs');
    await server.register(Vision);
    
    //static
    await server.register(require('inert'));

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
  
    server.auth.default('jwt');

    server.views({
        engines: { ejs: Ejs },
        relativeTo: __dirname,
        path: '../views'
    });
    server.route({
        method: 'GET',
        path: '/imgs/{filename}',
        handler: {
            file: function (request) {
                
                return 'imgs/'+request.params.filename;
            }
        }
    });
    server.route(
        {
            method: 'GET', path: '/restricted', config: { auth: 'jwt' },
            handler: function(request, h) {
                console.log(request.auth);
                
              const response = h.response({text: 'You used a Token!'});
              response.header("Authorization", request.headers.authorization);
              return response;
            }
          }
    )
    server.route({
        method: 'GET',
        path: '/js/{filename}',
        handler: {
            file: function (request) {
                
                return 'js/'+request.params.filename;
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/css/{filename}',
        handler: {
            file: function (request) {
                
                return 'css/'+request.params.filename;
            }
        }
    });
    server.route({  
        method: [ 'GET', 'POST' ],
        path: '/{any*}',
        handler: (request, h) => {
          const accept = request.headers.accept
      
          if (accept && accept.match(/json/)) {
            return Boom.notFound('Fuckity fuck, this resource isn’t available.')
          }
      
          return h.view('404', {
              title: "正觉工场|404|NOT FOUND|页面未找到"
          })
        }
      })
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();