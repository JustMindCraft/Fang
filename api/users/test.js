import Joi from 'joi';

export default [
    {
        method: 'GET',
        
        path: '/api/v1/test2/{id}',


        handler: async (request, h) => {
            console.log(request.params.id);
            console.log(request.query);
            return h.response("hello test").code(200)
            
            
        },
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required(),
                }),
                query: 
                Joi.object({
                    username: Joi.string().required(),
                }),
            },
            auth: false,

            tags: ['api'], 
            notes: '这是一个测试',
            description: "测试",
           
        },
    },
    {
        method: 'POST',
        
        path: '/api/v1/test2/{id}/update',


        handler: async (request, h) => {
            console.log(request.params.id);
            console.log(request.payload);
            return h.response("hello test").code(200)
            
            
        },
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.string().required(),
                }),
                payload: 
                    Joi.object({
                        username: Joi.string().required(),
                    }),
            },
            auth: false,

            tags: ['api'], 
            notes: '这是一个POST测试',
            description: "POST测试",
           
        },
    },
]