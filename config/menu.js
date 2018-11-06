const allMenus =  [
    {
        name: "个人中心",
        path: '/my',
        isFold: false,
        scope: ['loginedUser']
    },
    {
        name: "登出",
        path: '/logout',
        isFold: false,
        scope: ['loginedUser']
    },
    {
        name: "用户管理",
        path: '/users',
        isFold: true,
        scope: ['superAdmin']
    },
    {
        name: "订单管理",
        path: '/orders',
        isFold: true,
        scope: ['superAdmin']
    },
    {
        name: "商店",
        path: '/shop',
        isFold: false,
        scope: []
    },
    {
        name: "文章管理",
        path: '/posts',
        scope: ['superAdmin']
    }
]

export default function menu(scope){
    let menu = [];
    let marked = [];
   
    for (let j = 0; j < scope.length; j++) {
        const role = scope[j];
        for (let index = 0; index < allMenus.length; index++) {
            if(marked.includes(index)){
                continue;
            }
            const item = allMenus[index];
            if(item.scope.includes(role)){
                menu.push({
                    name: item.name,
                    path: item.path,
                    isFold: item.isFold,
                });
                marked.push(index);
            }
            
        }
    }
    return menu;
}