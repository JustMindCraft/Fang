import Post from '../models/Post';

export default 
[
    {
    
        method: 'GET',
    
        path: '/login',
    
        handler: async (request, h) => {
        
            try {
                console.log(request.query);
                
                return h.view('login', {
                        title: '正觉工场 | 登录 ',
                        msg: request.query.msg
                    });
             } catch (error) {
                console.error(error);
                return error;
            }
        
        }
    },
    {
        method: "POST",

        path: '/login',

        handler: async (request, h) => {
            console.log(request.auth);
            console.log(request.payload);
            
           return h.redirect('/login?msg=trying');
            
        }
    }
]