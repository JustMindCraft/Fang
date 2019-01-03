import { throws } from 'assert';
import Shop from '../../models/Shop';

export default 
[
    {
    
        method: 'get',
    
        path: '/api/v1/shops',

       
        config: {  auth: false },
    
        handler: async (request, h) => {

            try {
               const shop = await Shop.findOne({...request.query},['name','name_zh','isDefault']);
               console.log(shop);
               
                
               return shop;
                
            } catch (error) {
                throws(error);
                return h.response("服务器出错，联系管理员").code(500);
            }
           
        
        },
        
    },
   
]