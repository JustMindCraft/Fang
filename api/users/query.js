import User from '../../MongoModels/User';

export default 
[
    {
    
        method: 'get',
    
        path: '/api/v1/users',

       
        config: {  auth: false },
    
        handler: async (request, h) => {
            const range = request.query.range;
            const filter = request.query.filter;
            const sort = request.query.sort;
            console.log({sort});
            console.log({filter});
            
            
            let rangeSize = range[1]+1;
            try {

                let users = await User.find({username: {$exists: true}})
            
                return h.response(users).header("Content-Range", `items ${range[0]}-${range[1]}/${rangeSize}`, {append: true})
                .header("access-control-expose-headers", "Content-Range", {append: true});
               
                
            } catch (error) {
                console.log(error);
                
                return undefined;
            }
            
           
        
        },
        
    },
   
]