export default [
    {
        method: 'DELETE',
        
        path: '/api/v1/users/:id/delete',

    
        config: {  auth: false },

        handler: async (request, h) => {

        }
    },
    {
        method: 'OPTIONS',

        path: '/api/v1/users/:ids/delete',

        config: { auth: false },
        
        handler: async (request, h) => {
            console.log(request.params);
            
        }

    }
]