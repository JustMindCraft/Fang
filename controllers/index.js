
import home from './home';
import login from './login';
import reg from './reg';
import my from './my'
import users from './users';
import roles from './roles'
roles[0].options.auth.scope.push("+loginedUser");
console.log(roles[0].options.auth);


export default [home, reg, login, my, users, roles];
