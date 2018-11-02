
export default 
[
    {
    
        method: 'GET',
    
        path: '/login',

        config: {auth: false},
    
        handler: async (request, h) => {

            var Gun = require('gun'); // in NodeJS 
            require('gun/sea');
            let sea = Gun.SEA
            var alias = "alice"
            var pass = "secret";

            var gun = Gun('http://localhost:8000/gun');
            gun.get('hello').put({ name: "world" });

            // now on another machine...
            var login = await sea.work(alias, pass);
            let getAuth = new Promise((resolve,reject)=>{
                gun.get("first_auth").on(function(data,key){
                
                    sea.decrypt(data.auth, login, function(keys){
                        resolve(keys);
    
                    }); // encrypted auth loaded from graph
                })
            })

            console.log(await getAuth);
            


           
           


        
            try {
                
                return h.view('login', {
                        title: '正觉工场 | 登录 ',
                        msg: request.query.msg
                    });
             } catch (error) {
                console.error(error);
                return error;
            }
        
        },
        
    },
    {
        method: "POST",

        path: '/login',

        config: {  auth: false },

        handler: async (request, h) => {
            console.log(request.auth);
            console.log(request.payload);
            
           return h.redirect('/login?msg=trying');
            
        }
    }
]