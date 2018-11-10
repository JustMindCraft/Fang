import User, { UserValidSchema } from '../MongoModels/User';
import menu from '../config/menu';
import Joi from 'joi';

import {gun, Gun} from '../core/gun'

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
                        msg: request.query.msg,
                        reg_session: request.query.reg_session,
                        menu: request.auth.credentials? request.auth.credentials.menu : []
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

            console.log(password);
            //开始加密用户密码
            

            
            
            const result = Joi.validate(request.payload, UserValidSchema);
            let user = null;
            try {
                 user  = new User(userParams);

                
            } catch (error) {
                console.log("第一次报错", error);
                
            }


            let putRegSession =(userParams)=> {
                let uuid = new require("uuid/v4")();
    
                return new Promise((rel, rej)=>{
                    gun.get("zhengjue").get("reg_sessions").get(uuid).put({...userParams}, ack => {
                        console.log(userParams);
                        
                        if (ack.ok === 1) {
                            
                            rel(h.redirect(`/reg?msg=${msg}&reg_session=${uuid}`))
                            
                        }else{
                            rej("gun error");
                        }
                        
                    
                    
                    })
                })
            }

            let putLoginSession = (user, expireTime) => {
                console.log("需要干的user", user._id);
                
                return new Promise((rel, rej)=>{
                    let uuid = new require("uuid/v4")();
        
                    gun.get("zhengjue").get("login_session").get(uuid).put({userId: user._id.toString(), expireTime, loginTime: new Date(Gun.state()).getTime()}, ack => {

                        let token = null;

                       

                        //获取jwt token
                        
                        if (ack.ok === 1) {
                            
                            rel(h.redirect(`/my?login=success`).state('data', {uuid}))
                            
                        }else{
                            rej("gun error");
                        }
                        
                    
                    
                    })
                })
            }
            let msg = "";
            if(result.error){
                let formatMsg = result.error.details.message;
                if(formatMsg === 'email" must be a valid email"'){
                    msg = "email_format_error";
                    await putRegSession(userParams);
                    return rel(h.redirect(`/reg?msg=${msg}&reg_session=${uuid}`))
                }

            }
            
            try {
                const bcrypt = require('bcrypt-nodejs');
                var salt = bcrypt.genSaltSync(Math.random());
                var hash = bcrypt.hashSync(user.password, salt);

                user.password = hash;
                user.password_repeat = null;
                await user.save();
                
                return await putLoginSession(user, 66666);
                
                
            } catch (error) {
                console.log(error);

                let username_error = error.errmsg.includes("username");
                let email_error = error.errmsg.includes("email");
                let dup_error = error.errmsg.includes("duplicate key");
                

                if(username_error && dup_error){
                    msg="username_repeat"
                }
                if(email_error && dup_error){
                    msg="email_repeat"
                }

                try {
                     return  await putRegSession(userParams);
                    
                } catch (error) {
                    return error;
                }
                


                
            }
        }
    }
]