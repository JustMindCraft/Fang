/* 
* @Author: Simontaosim
* @Date:   2018-10-31 02:57:23
* @Last Modified time: 2018-10-31 02:57:27
*/
import server from './server'
export default function registerControllers(controllers){

    
    let routesRegs = [];

    controllers.forEach(ctr => {

        routesRegs = routesRegs.concat(ctr);
    })
    routesRegs.forEach(ctr => {
        server.route(ctr);
    });

}