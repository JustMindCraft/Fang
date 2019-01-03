import users from './users';
import roles from './roles';
import apps from './apps';
import shops from './shops';


const connected = {
    method: 'GET',
    
    path: '/api/v1',


    config: {  auth: false },

    handler: async (request, h) => {
        return true;
    }
}

export default [connected]
.concat(users)
.concat(roles)
.concat(apps)
.concat(shops)
;