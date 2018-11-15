import Role from '../../MongoModels/Role';

export default 
[
    {
    
        method: 'get',
    
        path: '/api/v1/roles',

       
        config: {  auth: false },
    
        handler: async (request, h) => {
            const range = request.query.range;
            const filter = request.query.filter;
            const sort = request.query.sort;
            console.log({sort});
            console.log({filter});
            let rangeSize = range[1]+1;
            let roles = await Role.find({name: {$exists: true}})
            return h.response(roles).header("Content-Range", `items ${range[0]}-${range[1]}/${rangeSize}`, {append: true})
            .header("access-control-expose-headers", "Content-Range", {append: true});
           
        
        },
        
    },
   
]