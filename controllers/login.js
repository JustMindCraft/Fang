
export default 
[
    {
    
        method: 'GET',
    
        path: '/login',

        config: {auth: false},
    
        handler: async (request, h) => {
        
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