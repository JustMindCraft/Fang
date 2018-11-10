import test2 from './test2';
import server from '../core/server';

export default [
    {
        method: 'GET',
        path: '/test3',
        options: {
            auth: {
                strategy: 'session',
                scope: ["+loginedUser"],
                mode:"required"
            }
        },
        handler: async (request, h) => {

           return 0
            
            
            
            
        }
    }
]