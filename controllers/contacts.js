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
        path: '/contacts/create/success',
       
        handler: async (request, h) => {
           
            try {
                return h.view('contact_create_success', {
                    title: '正觉工场 | 意向提交成功',
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

            // console.log(request.payload);
            
           
            try {
                let customer = new Customer(request.payload);
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