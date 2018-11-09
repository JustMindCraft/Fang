/* 
* @Author: Simontaosim
* @Date:   2018-10-31 02:57:23
* @Last Modified time: 2018-10-31 02:57:27
*/

export function formatRoutes(controllers){
    //格式路由，使得他们能够根据path动态加载
    let routes = {};
    let routesRegs = [];
    controllers.forEach(ctr => {

        routesRegs = routesRegs.concat(ctr);
    })
    routesRegs.forEach(ctr => {
        routes[ctr.path].route = ctr;
        routes[ctr.path].method = ctr.method;
    });
    return routes;

}

export function grantRouteByRole(role, controller){
    controller.option.auth.scope.push("+"+role.name);
    return controller;
}

export function grantRoutesByRole(role, controllers){
    let ctrs = [];
    controllers.forEach(ctr => {
        ctrs.push(grantRouteByRole(role, controller));
    })
    return ctrs;
}

export function grantRoutesByRoles(roles, controllers){
    let ctrs = null;
    roles.forEach(role=>{
        ctrs = grantRoutesByRole(role, controllers);
    })
    return ctrs;
}

export default function registerControllers(server, controllers){

    let routesRegs = [];
    
    

    controllers.forEach(ctr => {

        routesRegs = routesRegs.concat(ctr);
    })
    routesRegs.forEach(ctr => {
        server.route(ctr);
    });

}