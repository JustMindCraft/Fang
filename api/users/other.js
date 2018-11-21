import { auth } from '../../models/User';

export default 
[
    {
    
        method: 'POST',
    
        path: '/api/v1/auth',

       
        config: {  auth: false },
    
        handler: async (request, h) => {
           console.log(request.auth);
           return h.response({token: "success"});
           
        
        },
        
    },
   
]