import server from '../core/server';
import Gun from 'gun';

import gunMin from 'gun/gun.min.js';

const Inert = require('inert')


async function runtime() {
  
  const db = new Gun({
    web: server.listener,
    file: 'data.json'
  })

  await server.register(Inert)

  server.route({
    method: 'GET',
    path: '/gun/gun.js',
    
    handler: {

        file: 'gun.min.js'
    }
  })

  server.route({
    method: 'GET',
    path: '/gun/nts.js',
    handler: {

        file: 'nts.js'
    }
  })

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
    path: '/css/{param*}', config: {  auth: false },
        handler: {
          directory: {
            path: "css/",
            redirectToSlash: true,
            index: true
          }
    }
  });
  server.route({
    method: 'GET',
    path: '/js/{param*}', config: {  auth: false },
        handler: {
          directory: {
            path: "js/",
            redirectToSlash: true,
            index: true
          }
    }
  });

  server.route({
    method: 'GET',
    path: '/', config: {  auth: false },
    handler: {
        file: 'index.html'
    }
  });

  await server.start()
  console.log('Server running at:', server.info.uri)
}

runtime()