import seed from '../config/seed';
import assert from 'assert';


export function checkSeed(){
    if(!seed.superAdmin){
        assert.fail('超级管理员必须设置,检查config/seed.js');
    }
    if(!seed.superAdmin.username){
        assert.fail('超级管理员的用户名必需设置,检查config/seed.js');
    }
    if(!seed.superAdmin.password){
        assert.fail('超级管理员的密码必需设置,检查config/seed.js');
        return false;
    }
    if(!seed.defaultApp){
        assert.fail('默认应用必需设置,检查config/seed.js');
        return false;
    }
    if(!seed.defaultApp.name){
        assert.fail('默认应用必需设置用户名,检查config/seed.js');
        return false;
    }
    if(!seed.defaultShop){
        assert.fail('默认店铺必需设置,检查config/seed.js');
        return false;
    }
    
    if(!seed.defaultShop.name){
        assert.fail('默认店铺必需设置店铺名,检查config/seed.js');
        return false;
    }
    
    if(!seed.defaultShop.description){
        assert.fail('默认店铺必需设置店铺描述,检查config/seed.js');
        return false;
    }
    if(!seed.defaultShop.classes){
        assert.fail('默认店铺必需设置产品分类,检查config/seed.js');
        return false;
    }
    if(seed.defaultShop.classes.length < 2){
        assert.fail('默认店铺的产品分类不能小于2个,检查config/seed.js');
        return false;
    }
    
    if(seed.defaultShop.card===undefined){
        // assert.fail('默认店铺的产品必需设置,检查config/seed.js');
        console.error('默认店铺的产品必需设置');
        assert.fail('检查config/seed.js');

        return false
        
    }
    
   
    
    return true;
}