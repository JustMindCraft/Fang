import {Gun} from '../core/gun';
import menu from '../config/menu';
require('gun/sea');

export default [
    {
        method: 'GET',
        path: '/my',
        options: {
            auth: {
                strategy: 'session',
                scope: ["loginedUser"]
            }
        },
        handler: async (request, h) => {


            let scope = [];
            
            if (request.auth.credentials) {
                 scope = request.auth.credentials.scope;
            }

            let render_menu = menu(scope);

            console.log("my", render_menu);
            
            
            try {
                return h.view('my', {
                    title: '正觉工场 | 个人中心 ',
                    msg: request.query.msg,
                    menu: render_menu
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        }
    }
]