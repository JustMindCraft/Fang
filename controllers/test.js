import test2 from './test2';
import server from '../core/server';

export default [
    {
        method: 'GET',
        path: '/test1',
        config: {
            auth: false,
        },
        handler: async (request, h) => {
            server.route(test2);

           return 0
            
            
            
            
        }
    }
]