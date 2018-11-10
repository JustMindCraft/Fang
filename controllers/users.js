import User from '../MongoModels/User';
import Role from '../MongoModels/Role';

export default [
    {
        method: 'GET',
        path: '/users',
        // options: {
        //     auth: {
        //         strategy: 'session',
        //         scope:["{credentials.token}"],
        //     }
        // },
        config: {auth: false},

        handler: async (request, h) => {
            let msg = request.query.msg? request.query.msg: "";

            
            
            try {
                

                let getUserWithRoleName = () => {
                    return new Promise((resolve, reject)=>{
                        User.find({}).populate({path: 'roles', select: 'name isSuper' }).exec(function(err, rlt){
                            if(!err){
                                let users = [];
                                for (let i = 0; i < rlt.length; i++) {
                                    let user = {
                                        ...rlt[i]._doc
                                    };
                                    if(user.roles){
                                        for (let j = 0; j < user.roles.length; j++) {
                                            if(user.roles[j].isSuper){
                                                user.isSuper = true;
                                                
                                            }else{
                                                user.isSuper = false;
                                            }
                                            
                                        }
                                    }
                                    
                                    users.push(user);
                                }

                                resolve(users);
                            }else{
                                reject(err);
                            }
                            
                        })
                    })
                }
                
                let users = await getUserWithRoleName();

                console.log(users);
                
                
                return h.view('users', {
                    title: '正觉工场 | 用户管理 ',
                    msg,
                    menu: request.auth.credentials? request.auth.credentials.menu : [],
                    users,
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        }
    },
    {
        method: 'GET',
        path: '/users/edit/{id}',
        // options: {
        //     auth: {
        //         strategy: 'session',
        //         scope:["{credentials.token}"],
        //     }
        // },
        config: {auth: false},
        handler: async (request, h) => {
            let msg = request.query.msg? request.query.msg: "";

            let user = await User.findById(request.params.id)

            let user_roles = user.roles;

            let roles = await Role.find();


            return h.view('user_edit', {
                title: '正觉工场 |  编辑用户 ',
                msg,
                menu: request.auth.credentials? request.auth.credentials.menu : [],
                user,
                user_roles,
                roles,
            });
        }
    },
    {
        method: 'POST',
        path: '/users/update/{id}',
        options: {
            auth: {
                strategy: 'session',
                scope:["{credentials.token}"],
            }
        },
        handler: async (request, h) => {
            let msg = request.query.msg? request.query.msg: "";

            return h.redirect("/update/"+request.params.id+"msg="+msg);
        }
    }
]