import { auth } from '../MongoModels/User';

import {gun, Gun} from '../core/gun'

export default 
[
    {
    
        method: 'GET',
    
        path: '/login',

       
        options: {
            auth: {
                strategy: 'session',
                mode: "try",
                scope: ["+loginedUser"]
            }
        },
    
        handler: async (request, h) => {
            console.log("login page auth", request.auth);
            if(request.auth.isAuthenticated){
                return h.redirect('/my');
            }
        
            try {
                
                return h.view('login', {
                        title: '正觉工场 | 登录 ',
                        msg: request.query.msg,
                        menu: []
                    });
             } catch (error) {
                console.error(error);
                return error;
            }
        
        },
        
    },
    {
        method: 'GET',
        path: '/logout', config: {  auth: false },
        handler: async (request, h) => {
            request.server.app.cache.drop(request.state['sid'].uuid);
            request.cookieAuth.clear();
            return h.redirect('/');
        }
    },
    {
        method: "POST",

        path: '/login',

        config: {  auth: false },

        handler: async (request, h) => {
            let userparams = request.payload.userparams;
            let password = request.payload.password;

            if(userparams==''){
                let msg = "邮箱或者用户名不得为空";
                msg = encodeURI(msg);
                return h.redirect(`/login?msg=${msg}`);
            }
            if(!password){
                let msg = "密码不得为空";
                msg = encodeURI(msg);
                return h.redirect(`/login?msg=${msg}`);

            }
            let user = null;
            try {
                user = await auth(userparams, password);
                
            } catch (error) {
                console.log(error);
                    
                let msg = "服务器不知道出了什么问题";
                msg = encodeURI(msg);
                return h.redirect(`/login?msg=${msg}`);
                
            }
            if(user){

                let doLogin = expireTime => {
                    let uuid = new require("uuid/v4")();
    
                    return new Promise((rel, rej)=>{
                        gun.get("zhengjue").get("login_session").get(uuid).put(
                            {userId: user._id.toString(), expireTime, loginTime: new Date(Gun.state()).getTime()}, async ack => {
                            
                            if (ack.ok === 1) {
                                await request.server.app.cache.set(uuid, { user }, 0);
                                request.cookieAuth.set({ uuid });
                                
                                rel(h.redirect(`/my?login=success`).state('data', { uuid }))
                                
                            }else{
                                rej("gun error");
                            }
                            
                        
                        
                        })
                    })
                }
                try {
                     return await doLogin( 24 * 60 * 60 * 1000);
                    
                } catch (error) {
                    console.log(error);
                    
                    let msg = "服务器不知道出了什么问题";
                    msg = encodeURI(msg);
                    return h.redirect(`/login?msg=${msg}`);
                }


            }else{
                let msg = "用户密码不匹配";
                msg = encodeURI(msg);
                return h.redirect(`/login?msg=${msg}`);
            }
            
        }
    }
]