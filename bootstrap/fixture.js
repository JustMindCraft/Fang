import seed from '../config/seed';
import assert from 'assert';


export function checkSeed(){
    if(!seed.superAdmin){
        assert.fail('超级管理员必须设置,检查config/seed.js');
        return false;
    }
    if(!seed.superAdmin.username){
        assert.fail('超级管理员的用户名必需设置,检查config/seed.js');

        return false;
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

    if(!seed.defaultShop.goods){
        assert.fail('默认店铺的产品必需设置,检查config/seed.js');
        return false;
    }
    if(seed.defaultShop.goods.length < 2){
        assert.fail('默认店铺的产品不能小于2个,检查config/seed.js');

        return false;
    }
    let noNameProducts = seed.defaultShop.goods
    .filter(good => !good.name || good.name==='');
    if(noNameProducts.length > 0){
        assert.fail('默认店铺的产品不能小于2个,检查config/seed.js');

        return false;
    }
    let noImagesProducts = seed.defaultShop.goods
    .filter(good => !good.images || good.images.length===0);

    if(noImagesProducts.length > 0){
        assert.fail('产品不能没有图片,检查config/seed.js');
        return false;
    }

    let noImageCoverProducts = seed.defaultShop.goods
    .filter(good => !good.imageCover || good.imageCover==='');

    if(noImageCoverProducts.length > 0){
        assert.fail('产品不能没有封面图片,检查config/seed.js');
        return false;
    }

    let noImageThumbCoverProducts = seed.defaultShop.goods
    .filter(good => !good.imageThumb || good.imageThumb==='');

    if(noImageThumbCoverProducts.length > 0){
        assert.fail('产品不能没有缩略图片,检查config/seed.js');
        return false;
    }

    let noDecriptionProducts = seed.defaultShop.goods
    .filter(good => !good.description || good.description==='');

    if(noDecriptionProducts.length > 0){
        assert.fail('产品不能没有描述,检查config/seed.js');

        return false;
    }
    
    return true;
}