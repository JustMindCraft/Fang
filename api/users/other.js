import Joi from 'joi';

import Request from 'request-promise';

import sha256 from 'sha256';
import User, { newAdmin } from '../../models/User';

export default 
[
    {
        method: 'GET',
    
        path: '/api/v1/test',
    
        handler: async (request, h) => {

            
            

            
            

           return h.response("测试模型");
           
           
        
        },
        options: {
           
            auth: false,
            description: "开始测试模型",
           
        },
    },
    {
    
        method: 'get',
    
        path: '/api/v1/auth/check',
    
        handler: async (request, h) => {

           return h.response({token: request.auth.token});
           
        
        },

        options: {
            
            validate: {
                query: Joi.object({
                    token: Joi.string().required().description("需要被验证的token"),
                }).description("手机号和4位验证码")
            },
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            tags: ['api', 'auth'], 
            notes: '把本地token交给此API验证，如果返回的Token和提交的token一致，说明已经登录，否则没有登录',
            description: "查看是否登录",
        },
        
    },
    {
    
        method: 'POST',
    
        path: '/api/v1/mobileLogin',
        

        handler: async (request, h) => {
            if(!request.payload){
                return h.response("mobile or smsCode missing").code(404);
            }
            const { mobile, smsCode } = request.payload;
            
            if(!mobile || !smsCode){
                    return h.response("mobile or smsCode missing").code(404);
            }
            return 'hello'

           
        
        },
        options: {
            validate: {
                payload: Joi.object({
                    mobile: Joi.string().required().description("手机号"),
                    smsCode: Joi.string().required().description('手机验证码')
                }).description("手机号和4位验证码")
            },
            auth: false,

            tags: ['api', 'login'], 
            notes: '使用手机号和使用/api/v1/smscode中取得的手机验证码，进行登录，返回得到token凭证',
            description: "手机验证码登录",
           
        },

        
        
    },

    {
    
        method: 'POST',
    
        path: '/api/v1/smscode',
    
        handler: async (request, h) => {
           const { mobile } = request.payload;
           if(!mobile){
                return h.response("mobile missing").code(404);
           }
           let apikey = "05856ec439f15fa13b935f89988cf4d2";
            let num="";
                for(let i=0;i<4;i++)
                {
                    num+=Math.floor(Math.random()*10);
                }
            let text = "【鲜至臻品】感谢使用鲜至臻品，您的验证码是"+num+"，让我们一起开启寻臻之旅。如非本人操作，请忽略本短信。";

            let uri = "https://sms.yunpian.com/v2/sms/single_send.json";

            
            try {
                let ref = await  Request({
                      url: uri,
                      method: 'POST',
                      headers: {
                        'content-type':'application/x-www-form-urlencoded;charset=utf-8',
                        "Accept":'application/json;charset=utf-8'
                      },
                        form: {
                            apikey,
                            mobile,
                            text,
                        }

                        
                  });

                return h.response(sha256(num)).code(200);
                
            } catch (error) {
                console.log(error);
                return h.response("出错").code(501);
            }
            


          
           
           
        
        },
        options: {
            validate: {
                payload: Joi.object({
                    mobile: Joi.string().regex(/^1[3|4|5|7|8|9][0-9]{9}$/).required().description("大陆手机号码"),
                })
            },
            auth: false,

            tags: ['api', 'login'], 
            notes: '手机号码作为参数，向云片网请求验证码，返回验证码,验证码被sha256加密了',
            description: "获取手机验证码",
           
        },


        
        
    },
    {
    
        method: 'POST',
    
        path: '/api/v1/login',
    
        handler: async (request, h) => {
           const { username, password } = request.payload;
           if(!username){
                return h.response("username missing").code(404);
           }
           return username;
           
           
        
        },
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().required().description("可以是手机号，或者邮箱或者用户名"),
                    password: Joi.string().required().description("密码"),
                })
            },
            auth: false,

            tags: ['api', 'login'], 
            notes: '使用手机号，邮箱或者用户名加上密码登录，返回的登录凭证token',
            description: "密码登录",
           
        },


        
        
    },
    {
    
        method: 'POST',
    
        path: '/api/v1/register_back_token',
    
        handler: async (request, h) => {
           const { username, password } = request.payload;
           if(!username){
                return h.response("username missing").code(404);
           }
           return username;
           
           
        
        },
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().required().description("可以是手机号，或者邮箱或者用户名"),
                    password: Joi.string().required().description("密码"),
                    mobile: Joi.string().regex(/^1[3|4|5|7|8][0-9]{9}$/).required().description("大陆手机号码"),
                    email: Joi.string().optional().describe("用户邮箱,会在各个应用内判断重复"),
                    appId: Joi.string().optional().description("在哪个应用注册，默认为正觉工场这个应用内注册的")
                })
            },
            auth: false,

            tags: ['api', 'login'], 
            notes: '手机号，邮箱,用户名,以及密码注册新用户，返回的登录凭证token',
            description: "注册新用户，默认登录",
           
        },


        
        
    },
    {
    
        method: 'POST',
    
        path: '/api/v1/register',
    
        handler: async (request, h) => {
           const {  appId, email,  mobile, password,  username} = request.payload;
           let user = User.new({
            appId, email,  mobile, password,  username
           })
           try {
               await user.save();
           } catch (error) {
               return error;
           }
           return user;
           
           
        
        },
        options: {
            validate: {
                payload: Joi.object({
                    appId: Joi.string().optional().description("在哪个应用注册，默认为正觉工场这个应用内注册的"),
                    email: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).optional().describe("用户邮箱,会在各个应用内判断重复"),
                    mobile: Joi.string().regex(/^1[3|4|5|7|8][0-9]{9}$/).required().description("大陆手机号码"),
                    password: Joi.string().required().description("密码"),
                    username: Joi.string().regex(/^\w+$/).required().description("用户名"),
                })
            },
            auth: false,

            tags: ['api', 'login'], 
            notes: '手机号，邮箱,用户名,以及密码注册新用户，返回的登录凭证token',
            description: "注册新用户，默认不登录",
           
        },


        
        
    },

    


   
]