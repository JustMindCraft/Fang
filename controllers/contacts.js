import Customer from '../MongoModels/Customer'
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
    },
    {
        method: 'GET',
        path: '/contacts',
       
        handler: async (request, h) => {

            
           
            try {
                let customers = await Customer.find({});
                // console.log(customers);
                
                return h.view('contacts', {
                    title: '正觉工场 | 客户管理',
                    menu: request.auth.credentials? request.auth.credentials.menu : [],
                    customers,
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        },
        options: {
            auth: {
                strategy: 'session',
                scope:["{credentials.token}"],
            },
        },
    },
    {
        method: 'GET',
        path: '/contacts/create/success',
       
        handler: async (request, h) => {
           
            try {
                return h.view('contact_create_success', {
                    title: '正觉工场 | 客户联系请求',
                    menu: []
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        },
       config: {
           auth: false,
       }
    },
    {
        method: 'POST',
        path: '/contacts/create',
       
        handler: async (request, h) => {
           
            try {
                let customer = new Customer({
                    ...request.payload,
                    status: "untouched"
                });
                await customer.save();

                return h.redirect('/contacts/create/success')
                
            } catch (error) {
                console.error(error);
                return h.redirect('/contacts/new');
                
            }
            
            
            
            
        },
       config: {
           auth: false,
       }
    }
]