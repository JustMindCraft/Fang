import Role from '../MongoModels/Role'

Role.find({"allowPaths": {"GET_/test1": true}}, (err, para2, para3)=>{
    console.log("test2", err);
    console.log("test2", para2);
    console.log("test2", para3);
    
});
// let scope =[];
// roles.forEach(role => {
//     scope.push(role.name);
// });

//  async function injectRoleScope(){

//  }
export default [
    {
        method: 'GET',
        path: '/test2',
        options: {
            auth: {
                strategy: 'session',
                scope: ["+loginedUser"],
                mode:"required"
            }
        },
        handler: async (request, h) => {

            console.log(request.path);
            
           return "test2 effect"
            
            
            
            
        }
    }
    
]