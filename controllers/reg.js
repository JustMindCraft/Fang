
export default 
[
    {
    
        method: 'GET',
    
        path: '/reg', 
        
        config: {auth: false},
    
        handler: async (request, h) => {
        
            try {
                
                return h.view('reg', {
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
        
        config: {auth: false},

        handler: async (request, h) => {
            console.log(request.auth);

           return h.redirect('/reg?msg=trying');
            
        }
    }
]