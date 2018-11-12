
export default [
    {
        method: 'GET',
        path: '/contacts/new',
       
        handler: async (request, h) => {
           
            try {
                return h.view('new_contact', {
                    title: '正觉工场 | 填写意向',
                    menu: []
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        },
       config: {
           auth: false,
       }
    }
]