
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
            if(request.payload.userparams==''){
                let msg = "邮箱或者用户名不得为空";
                msg = encodeURI(msg);
                return h.redirect(`/login?msg=${msg}`);
            }
            if(!request.payload.password){
                let msg = "密码不得为空";
                msg = encodeURI(msg);
                return h.redirect(`/login?msg=${msg}`);

            }

            let password = request.payload.password;
            
            return 0
            
        }
    }
]