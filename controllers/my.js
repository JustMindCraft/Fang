import User from '../MongoModels/User';

export default [
    {
        method: 'GET',
        path: '/my',
       
        handler: async (request, h) => {
           

            let user = await  User.findById(request.auth.credentials.userId);
            
            
            try {
                return h.view('my', {
                    title: '正觉工场 | 个人中心 ',
                    msg: request.query.msg,
                    menu:  request.auth.credentials.menu,
                    user,
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        },
        options: {
            auth: {
                strategy: 'session',
                scope: ['+loginedUser']
            },
        },
    }
]