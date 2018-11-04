import User, { UserValidSchema } from '../MongoModels/User';

import Joi from 'joi';

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

            let userParams = request.payload;
            let password = request.payload.password;

            console.log(userParams);
            

            
            
            const result = Joi.validate(request.payload, UserValidSchema);

            let user  = new User(userParams);
            
            console.log(user);

            try {
                await user.save();
                
            } catch (error) {
                console.log(error.errmsg);
                
            }

            
            if(result.error){
                console.log(result.error.details);

            }

            

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