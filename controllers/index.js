import server from '../core/server';
import hello from './hello';
import home from './home';

server.route(hello);
server.route(home);