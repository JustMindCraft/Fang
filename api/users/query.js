import User from '../../models/User';

export default 
[
    {
    
        method: 'get',
    
        path: '/api/v1/users',

       
        config: {  auth: false },
    
        handler: async (request, h) => {
           return 'hllo'
           
        
        },
        
    },
   
]