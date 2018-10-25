import Admin from '../models/Admin'
export default  {
    method: 'GET',
    path: '/hello/{user}',
    handler: function (request, h) {
        Admin.findOne();
        let admin  = new Admin({username: 'admin'});
        admin.save();
        console.log(admin.tags);
        Object.keys(admin).forEach(key => {
           console.log(key);
           
        })
        
        return `Hello ${encodeURIComponent(request.params.user)}!`;
    }
}