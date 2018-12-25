import Role from './Role';
import { getOneGoodFromGoodClassId } from './GoodClassGood';
import GoodClass from './GoodClass';
import { getOneShopFromGoodClassId } from './ShopGoodClass';
import ShopGood from './ShopGood';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodSchema = new mongoose.Schema({
    //good，可以是商品，也可以是任何可以被用来交易的事务
    //isCard属性承载了分销的功能，也是本分销系统重要特色：获取卡片，开店，代理商品,后台系统在同一个应用内， 为各个级别的卡片设置佣金
    name:  String,
    name_zh: String,
    isTool: Boolean,//若是真，则购买者会获取name_holder这种格式的角色，也有中文名名称比如高级会员卡持有人
    onShelf: Boolean,//是否上架
    shelfPosition: String,//货架位置, exg: 4_5, 第4行，第5列
    isCard: Boolean, //商品可以是会员卡，若是，则在此应用的会员卡自增cardLevel, 添加会员卡和添加普通商品应当做成不同的表单
    cardLevel: Number,//自增cardLevel，根据shop.cardLevelCurrent 中的值增加, 零级别会员可以出售1级别会员，2级别会员在这个版本就不可出售3级别会员卡了
    givable: Boolean, //说明此商品是否可以被赠予,这样某件商品特定角色用户可以使用立即领取的操作,如果是，则不管actionType属于什么类型，都可以做赠予操作
    actionType: String, //['give', 'buy', 'book']赠予，购买，预定
    inventory: Number,
    inventoryUnit: String,
    aliveTime: Number,
    priceCurrent: String, //"RMB"
    price_rmb: Number,//所有的货币单位都是存储其最小的货币单位作为单位，人民币就是分, 这个属性的意义在于之后能够使用积分支付部分商品,这个价格是游客用户以及没有任何角色的登录用户看到的价格

   
    imageThumb: String,//50*50
    imageCover: String,//200*300
    imageCoverBig: String,//680*680
    images: [{type: String}], //680*680
    //使用前端图片剪切工具，大小和格式并没有规定好，以上关于图片的字段还需要测试验证
    descriptionDraftJs: String, //draftJs格式的商品描述
    descriptionHtml: String, //html格式的商品描述
    descriptionMarkdown: String, //markdown格式的商品描述
    description: String, //默认格式描述
    //描述类型统统需要存储，以便在任何情况下格式都可以被迁移和转换
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    levelAgencyPay: Object, //规定这个商品各个级别的卡片持有人的报酬， 默认不添加，在商品列表中添加
    /**
     * {
     *      0: "111", 0级卡片返佣
     *      1: "111", 1级卡片返佣
     * }
     */
});

const Good = mongoose.model('Good', GoodSchema);


export async function createGood(params, goodClassId){
    let good = await getOneGoodFromGoodClassId(goodClassId, {name: params.name, name_zh: params.name_zh});
    if(good){
        return "GOODNAME already in the same goodClass";
    }

    good = new Good({
        ...params,
    });

    let goodClass = new GoodClass({
        good: good._id,
        goodClass: goodClassId
    });
    let shop = await getOneShopFromGoodClassId(goodClassId);
    if(shop){
        let shopGoods = new ShopGood({
            shop: shop._id,
        })
    }else{
        return "GOODCLASS_ID NOT FOUND IN DATABASE"
    }
}





export async function setDefaultCards(shop, shelf, app){
    //商店默认可以出售0级别会员卡
    let card = await Good.findOne({shop, shelf,isDefault: true, name: "zero_level_card", name_zh: "正觉至尊卡"});
    let nobody = await Role.findOne({app, name: "nobody"});
    let loginedUser = await  Role.findOne({app, name: "loginedUser"});
    if(!card){
        card = new Good({
             //good，可以是商品，也可以是任何可以被用来交易的事务
            //isCard属性承载了分销的功能，也是本分销系统重要特色：获取卡片，开店，代理商品,后台系统在同一个应用内， 为各个级别的卡片设置佣金
            name:  "zero_level_card",
            name_zh: app.name_zh+"0级别卡",//自动生成的默认域名,但是之后由用户自己可以自己更改
            createdByShop: shop,//在哪家店铺被上线
            agencyShops: [shop],//正在被哪些店铺代理
            isTool: true,//若是真，则购买者会获取name_holder这种格式的角色，也有中文名名称比如高级会员卡持有人
            onShelf: true,//是否上架
            shelfPosition: "0_0",//货架位置, exg: 4_5, 第4行，第5列
            shelf,//属于哪个货架
            isCard: true, //商品可以是会员卡，若是，则在此应用的会员卡自增cardLevel, 添加会员卡和添加普通商品应当做成不同的表单
            cardLevel: 0,//自增cardLevel，根据shop.cardLevelCurrent 中的值增加, 零级别会员可以出售1级别会员，2级别会员在这个版本就不可出售3级别会员卡了
            givable: true, //说明此商品是否可以被赠予,这样某件商品特定角色用户可以使用立即领取的操作,如果是，则不管actionType属于什么类型，都可以做赠予操作
            givableRoles: [],
            actionType: "buy", //['give', 'buy', 'book']赠予，购买，预定
            inventory: 200,
            inventoryUnit: "张",
            aliveTime: 1000*60*60*24*7,//上架一周
            price_rmb: 58800,//一百元，所有的货币单位都是存储其最小的货币单位作为单位，人民币就是分, 这个属性的意义在于之后能够使用积分支付部分商品,这个价格是游客用户以及没有任何角色的登录用户看到的价格

            roles_price_rmb: {
                nobody: 58800,
                loginedUser: 58800,
            }, //不同角色的用户享有不同的价格, 这个属性并不会第一次被创建，而是在角色中，为此类角色添加优惠或者不优惠的价格
            /**
             * {
             *      some_coupon_holder: "111", 某个持有优惠券的用户的价格
             * }
             */
            price_limit_time: {
                begin: new Date(),
                last: 1000*60*60*24*7,
                price: 10000,
                roles: [nobody, loginedUser]
            },//限定时间内的价格，
            /**
             * begin: { type: Date, default: Date.now },从什么时候起，
             * last: Number, 持续多久
             * price: Number 期间价格多少
             * roles: [], 享受的角色
             *  */
            imageThumb: "https://res.cloudinary.com/da7efhqvt/image/upload/c_thumb,w_200,g_face/v1543504396/zhengjue/imgs/members-gift-card-template-vector-260nw-280673789.webp",//50*50
            imageCover: "https://res.cloudinary.com/da7efhqvt/image/upload/ar_16:9,c_fill,g_auto,e_sharpen/v1543504396/zhengjue/imgs/members-gift-card-template-vector-260nw-280673789.webp",//200*300
            imageCoverBig: "https://res.cloudinary.com/da7efhqvt/image/upload/v1543504396/zhengjue/imgs/members-gift-card-template-vector-260nw-280673789.webp",//680*680
            images: ["https://res.cloudinary.com/da7efhqvt/image/upload/v1543504396/zhengjue/imgs/members-gift-card-template-vector-260nw-280673789.webp"], //680*680
            //使用前端图片剪切工具，大小和格式并没有规定好，以上关于图片的字段还需要测试验证
            descriptionPlain: "持有正觉卡，享受软件代理权，企业云服务以及最强会员分销电商体系",
            descriptionDraftJs: "", //draftJs格式的商品描述
            descriptionHtml: "", //html格式的商品描述
            descriptionMarkdown: "", //markdown格式的商品描述
            //描述类型统统需要存储，以便在任何情况下格式都可以被迁移和转换
            properties: [{"商品类型": "虚拟电子卡"}],
            specification: "至尊卡",//每个商品只有一个规格，在生成商品的时候不同规格的会被处理成为不同的商品
            specificationDecription: "正觉工场最高权限会员",
            specificationDecriptionPrice_rmb: {
                "至尊卡": 588,
                "开店卡": 288
            },
            createdAt: new Date(),
            levelAgencyPay: {
                0: 10000,
            }, //规定这个商品各个级别的卡片持有人的报酬， 默认不添加，在商品列表中添加
            /**
             * {
             *      0: "111", 0级卡片返佣
             *      1: "111", 1级卡片返佣
             * }
             */
            app, //同一个app下，商品不重名
        })

        await card.save();
    }
    return card;

}

export default  Good;