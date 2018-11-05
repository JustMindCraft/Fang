import Post from "../models/Post";

export default [
    {
        method: 'GET',
        path: '/',
        config: {  auth: false },
        handler: async (request, h) => {
            console.log(request.state);
            try {
                return h.view('index', {
                    title: "正觉工场 |　首页",
                    logined: ""
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        }
    }
]