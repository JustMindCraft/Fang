import seed from '../config/seed';


export function checkSeed(){
    if(!seed.superAdmin){
        return false;
    }
    if(!seed.superAdmin.username){
        return false;
    }
    if(!seed.superAdmin.password){
        return false;
    }
    if(!seed.defaultApp){
        return false;
    }
    if(!seed.defaultApp.name){
        return false;
    }
    if(!seed.defaultApp.name_zh){
        return false;
    }
    if(!seed.defaultShop.name){
        return false;
    }
    if(!seed.defaultShop.name_zh){
        return false
    }
    if(!seed.defaultShop.description){
        return false;
    }
    if(!seed.defaultShop.classes){
        return false;
    }
    if(seed.defaultShop.classes.length < 2){
        return false;
    }

    if(!seed.defaultShop.goods){
        return false;
    }
    if(seed.defaultShop.goods.length < 2){
        return false;
    }
    let noNameProducts = seed.defaultShop.goods
    .filter(good => !good.name || good.name==='');
    if(noNameProducts.length > 0){
        return false;
    }
    let noImagesProducts = seed.defaultShop.goods
    .filter(good => !good.images || good.images.length===0);

    if(noImagesProducts.length > 0){
        return false;
    }

    let noImageCoverProducts = seed.defaultApp.goods
    .filter(good => !good.imageCover || good.imageCover==='');

    if(noImageCoverProducts.length > 0){
        return false;
    }

    let noImageThumbCoverProducts = seed.defaultApp.goods
    .filter(good => !good.imageThumb || good.imageThumb==='');

    if(noImageThumbCoverProducts.length > 0){
        return false;
    }

    let noDecriptionProducts = seed.defaultApp.goods
    .filter(good => !good.description || good.description==='');

    if(noDecriptionProducts.length > 0){
        return false;
    }
    
    return true;
}