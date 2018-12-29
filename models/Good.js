import ShopGood from './ShopGood';
import { getDefaultShop } from './AppShop';
import seed from '../config/seed';
import GoodClass from './GoodClass';

const mongoose = require('mongoose');
const GoodSchema = new mongoose.Schema({
    //good，可以是商品，也可以是任何可以被用来交易的事务
    //isCard属性承载了分销的功能，也是本分销系统重要特色：获取卡片，开店，代理商品,后台系统在同一个应用内， 为各个级别的卡片设置佣金
    name:  String,
    name_zh: String,
    isTool: {type: Boolean, default: false},//若是真，则购买者会获取name_holder这种格式的角色，也有中文名名称比如高级会员卡持有人
    onShelf: {type: Boolean, default: true},//是否上架
    shelfPosition: {type: String, default: '0_0'},//货架位置, exg: 4_5, 第4行，第5列
    isCard: {type: Boolean, default: false}, //商品可以是会员卡，若是，则在此应用的会员卡自增cardLevel, 添加会员卡和添加普通商品应当做成不同的表单
    cardLevel: {type: Number, default: 0},
    //当isCard为ture时生效, 自增cardLevel，根据shop.cardLevelCurrent 中的值增加, 零级别会员可以出售1级别会员，2级别会员在这个版本就不可出售3级别会员卡了
    givable: {type: Boolean, default: true}, 
    //说明此商品是否可以被赠予,这样某件商品特定角色用户可以使用立即领取的操作,如果是，则不管actionType属于什么类型，都可以做赠予操作
    actionType: {type: String, default: 'buy'}, //['give', 'buy', 'book']赠予，购买，预定
    inventory: {type: Number, default: 10},
    inventoryUnit: {type: String, default: '件'},
    aliveTime: {type: Number, default: 1000*60*60*24*7},//默认上架一周
    priceCurrent: {type: String, default: 'RMB'}, //"RMB"
    price_rmb: Number,//所有的货币单位都是存储其最小的货币单位作为单位，人民币就是分, 这个属性的意义在于之后能够使用积分支付部分商品,这个价格是游客用户以及没有任何角色的登录用户看到的价格
    brief: {type: String, default: '好货值得期待'}, //
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
    isDefault: {type: Boolean, default: false},
    levelAgencyPay: Object, //规定这个商品各个级别的卡片持有人的报酬， 默认不添加，在商品列表中添加
    currentSymbol: { type: String, default: '￥'}
    /**
     * {
     *      0: "111", 0级卡片返佣
     *      1: "111", 1级卡片返佣
     * }
     */
});

const Good = mongoose.model('Good', GoodSchema);


export async function getDefaultGoods(){
    try {
        const defaultShop = await getDefaultShop();
        const goods = await ShopGood.find({isDefault: true, isDeleted: false, shop: defaultShop._id})
        .populate('good',['good'], {isDefault: true, isDeleted: false});
        return goods;
    } catch (error) {
        console.error(error);
        return false;
        
    }
}

export default  Good;