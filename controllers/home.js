

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

            try {
                return h.view('index', {
                    title: "正觉工场 |　首页",
                    menu: request.auth.credentials? request.auth.credentials.menu: []
                });
                
            } catch (error) {
                return error;
                
            }
            
            
            
            
        }
    }
]