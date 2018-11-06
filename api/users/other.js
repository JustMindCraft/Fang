import { auth } from '../MongoModels/User';

import {gun, Gun} from '../core/gun'

export default 
[
    {
    
        method: 'POST',
    
        path: '/api/v1/auth',

       
        config: {  auth: false },
    
        handler: async (request, h) => {
           console.log(request.auth);
           
        
        },
        
    },
   
]