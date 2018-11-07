
import menu from '../config/menu';

export default [
    {
        method: 'GET',
        path: '/',
        options: {
            auth: {
                strategy: 'session',
                mode: "try",
            }
        },
        handler: async (request, h) => {
            console.log("home", request.auth);
            
            let scope = [];

            if (request.auth.credentials) {
                 scope = request.auth.credentials.scope;
            }

            let render_menu = menu(scope);
            console.log({render_menu});

            try {
                return h.view('index', {
                    title: "正觉工场 |　首页",
                    menu: render_menu,
                });
                
            } catch (error) {
                return error;
                
            }
            
            
            
            
        }
    }
]