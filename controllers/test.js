import test2 from './test2';
import test3 from './test3';
import server from '../core/server';
import Role from '../MongoModels/Role';
import User from '../MongoModels/User';
export default [
    {
        method: 'GET',
        path: '/test1/{params}',
        config: {
            auth: false,
        },
        handler: async (request, h) => {
           console.log(request.route.path);
           
            try {
                return console.log("123");
                
            } catch (error) {
                console.log(error);
                
            }
            

           
            
            
            
            
        }
    }
]