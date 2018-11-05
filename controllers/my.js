import {Gun} from '../core/gun';
require('gun/sea');

export default [
    {
        method: 'GET',
        path: '/my',
        config: {  auth: false },
        handler: async (request, h) => {
            
            try {
                return h.response('Hello').state('data', { firstVisit: false });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        }
    }
]