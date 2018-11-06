const allMenus =  [
    {
        name: "个人中心",
        path: '/my',
        scope: ['loginedUser']
    },
    {
        name: "登出",
        path: '/logout',
        scope: ['loginedUser']
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
                    path: item.path
                });
                marked.push(index);
            }
            
        }
    }
    return menu;
}