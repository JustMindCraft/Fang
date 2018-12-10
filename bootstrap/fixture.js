import { setSuperAdmin } from "../models/User";
import { createApp } from "../models/App";
import { createShop } from "../models/Shop";
import { getOwner } from "../models/AppOwner";
import { assginOwnerForShop } from "../models/ShopOwner";
import { getSettingValue, setSettingValue } from "../models/Setting";
import { assginRoleToApp } from "../models/AppRole";
import { getOneRoleIdByUserId } from "../models/RoleUser";
import { createGoodClass } from "../models/GoodClass";

//默认数据


async function createDefaultApp(params){
    let owner = await setSuperAdmin();
    
    let app =  await createApp(params,owner._id, "shop");
    let roleIdToAssign = await getOneRoleIdByUserId(owner._id, {name: 'superAdmin'});
    await assginRoleToApp(roleIdToAssign, app._id);

    return app;
}

async function createDefaultShop(params, appId){
    return await createShop(params,appId);

}

export async function fixture(){
    
    let isDefault = await getSettingValue("defaultDataSettled");
        
    if(isDefault){
        console.log("data already settled");
        
        return false;
    }else{
        await setSettingValue("defaultDataSettled", true);
    }
    let app = await createDefaultApp({
        name: 'defaultApp',
        name_zh: "默认应用",
        isDefault: true,
    });
    let shop = await createDefaultShop({
        name: "defaultShop",
        name_zh: "默认店铺",
        isDefault: true,
    },app._id);
    
    
    let ownerToAssign = await getOwner(app._id);
    await assginOwnerForShop(ownerToAssign._id, shop._id);

    await createGoodClass({
        name: "card",
        name_zh: "会员卡",
        isDefault: true,
    }, shop._id);

}