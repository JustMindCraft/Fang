
export default [
    {
        method: 'GET',
        path: '/test2',
        config: {
            auth: false,
        },
        handler: async (request, h) => {


           return "test2 effect"
            
            
            
            
        }
    }
]