import menu from '../config/menu';
import Role from '../MongoModels/Role';

export default [
    {
        method: 'GET',
        path: '/roles',
        options: {
            auth: {
                strategy: 'session',
                scope:["{credentials.token}"],
            }
        },
        handler: async (request, h) => {
            console.log(request.auth);
            


           
            let scope = [];
            
            if (request.auth.credentials) {
                 scope = request.auth.credentials.scope;
            }

            let render_menu = menu(scope);
            
            try {
                return h.view('roles', {
                    title: '正觉工场 | 角色管理 ',
                    msg: request.query.msg,
                    menu: render_menu
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        }
    },
    {
        method: 'GET',
        path: '/roles/new',
        options: {
            auth: {
                strategy: 'session',
                scope:["{credentials.token}"],
            }
        },
        handler: async (request, h) => {


          
            
            
            try {
                return h.view('roles_new', {
                    title: '正觉工场 | 新建角色 ',
                    msg: request.query.msg,
                    menu: request.auth.credentials.menu
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        }
    },
    {
        method: 'POST',
        path: '/roles/create',
        options: {
            auth: {
                strategy: 'session',
                scope:["{credentials.token}"],
            }
        },
        handler: async (request, h) => {
            // console.log("roles/create", request.payload);
            try {
                let params = request.payload;
                let allowPaths ={};
                let roleName = request.payload.role_name;
                Object.getOwnPropertyNames(params).forEach(key => {
                    console.log(key, params[key]);
                    if(key === "role_name"){
                        return 0;
                    }
                    if(Array.isArray(params[key])){
                        for (let index = 0; index < params[key].length; index++) {
                            
                            const access = params[key][index];
                            allowPaths["get|^/"+key]  = true;
                            if(params[key][index] === "create")
                            {
                                allowPaths["get|^/"+key+"/new"]  = true;
                                allowPaths["post|^/"+key+"/create"]  = true;
                            }
                            if(params[key][index] === "delete")
                            {
                                allowPaths["get|^/"+key+"/show/{id}"]  = true;
                                allowPaths["post|^/"+key+"/delete/{id}"]  = true;
                            }
                            if(params[key][index] === "update")
                            {
                                allowPaths["get|^/"+key+"/edit/{id}"]  = true;
                                allowPaths["get|^/"+key+"/show/{id}"]  = true;
                                allowPaths["post|^/"+key+"/update/{id}"]  = true;
                            }
                            
                        }
                        
                    }else{
                        allowPaths["get|^/"+key]  = true;
                        if(params[key] === "create")
                        {
                            allowPaths["get|^/"+key+"/new"]  = true;
                            allowPaths["post|^/"+key+"/create"]  = true;
                        }
                        if(params[key] === "delete")
                        {
                            allowPaths["get|^/"+key+"/show/{id}"]  = true;
                            allowPaths["post|^/"+key+"/delete/{id}"]  = true;
                        }
                        if(params[key] === "update")
                        {
                            allowPaths["get|^/"+key+"/show/{id}"]  = true;
                            allowPaths["post|^/"+key+"/update/{id}"]  = true;
                        }
                       
                    }
                    
                })
                

                let role = new Role({
                    name: roleName,
                    users: [],
                    isSuper: false,
                    allowPaths
                });
               await role.save();
               return h.redirect("/roles?msg=success")
                
            } catch (error) {
                console.log(error);
                return h.redirect(`/roles/new?msg=fail&reason=${error}`)
                
            }
            

        }

    }
]