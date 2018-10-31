import Post from '../models/Post';

export default 
[
    {
    
        method: 'GET',
    
        path: '/reg',
    
        handler: async (request, h) => {
        
            try {
                console.log(request.query);
                
                return h.view('login', {
                        title: '正觉工场 | 创建正觉账号 ',
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

        path: '/reg',

        handler: async (request, h) => {
            console.log(request.auth);

           return h.redirect('/reg?msg=trying');
            
        }
    }
]