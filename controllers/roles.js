import menu from '../config/menu';

export default [
    {
        method: 'GET',
        path: '/roles',
        options: {
            auth: {
                strategy: 'session',
                scope: ["superAdmin"]
            }
        },
        handler: async (request, h) => {
            console.log(request.auth);
            


            let scope = [];
            
            if (request.auth.credentials) {
                 scope = request.auth.credentials.scope;
            }

            let render_menu = menu(scope);

            console.log("roles", render_menu);
            
            
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
                scope: ["superAdmin"]
            }
        },
        handler: async (request, h) => {


            let scope = [];
            
            if (request.auth.credentials) {
                 scope = request.auth.credentials.scope;
            }

            let render_menu = menu(scope);

            console.log("roles/new", render_menu);
            
            
            try {
                return h.view('roles_new', {
                    title: '正觉工场 | 新建角色 ',
                    msg: request.query.msg,
                    menu: render_menu
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
                scope: ["superAdmin"]
            }
        },
        handler: async (request, h) => {
            console.log("roles/create", request.payload);
            return 0;

        }

    }
]