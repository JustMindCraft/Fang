import { auth } from '../../models/User';

export default 
[
    {
    
        method: 'get',
    
        path: '/api/v1/auth/check',

       
        config: { auth: 'jwt' },
    
        handler: async (request, h) => {
           console.log(request.auth);
           return h.response({token: "success"});
           
        
        },
        
    },
   
]