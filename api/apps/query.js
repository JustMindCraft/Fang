import { throws } from 'assert';
import App from '../../models/App';

export default 
[
    {
    
        method: 'get',
    
        path: '/api/v1/apps',

       
        config: {  auth: false },
    
        handler: async (request, h) => {
           

            try {
               const app = await App.findOne({...request.query}, ['name','name_zh','isDefault','secret']);
                
               return app;
                
            } catch (error) {
                throws(error);
                return h.response("服务器出错，联系管理员").code(500);
            }
           
        
        },
        
    },
   
]