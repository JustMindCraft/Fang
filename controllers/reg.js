import User from '../models/User'
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
    },
    {
        method: "POST",

        path: '/reg_valid',
        
        config: {auth: false},

        handler: async (request, h) => {
            
            let Joi = require('joi');
            let valid = User.setFeilds();
            const result = Joi.validate(request.payload, valid);
            
            if(result.error){
                 return result.error.details;

            }else{
                return 249967

            }
            
        }
    }
]