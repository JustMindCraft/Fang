var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodSchema = new mongoose.Schema({
    //good，可以是商品，也可以是任何可以被用来交易的事务
    //isCard属性承载了分销的功能，也是本分销系统重要特色：获取卡片，开店，代理商品,后台系统在同一个应用内， 为各个级别的卡片设置佣金
    name:  String,
    name_zh: String,
    createdByShop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    agencyShops: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
    isTool: Boolean,//若是真，则购买者会获取name_holder这种格式的角色
    isCard: Boolean, //商品可以是会员卡，若是，则在此应用的会员卡自增cardLevel
    cardLevel: Number,
    givable: Boolean, //说明此商品是否可以被赠予,这样某件商品特定角色用户可以使用立即领取的操作,如果是，则不管actionType属于什么类型，都可以做赠予操作
    givableRoles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    actionType: String, //['give', 'buy', 'book']赠予，购买，预定
    actionTypeRoles:[{ type: Schema.Types.ObjectId, ref: 'Role' }],
    inventory: Number,
    inventoryUnit: String,
    aliveTime: Number,
    price_rmb: Number,
    roles_price_rmb: Object, //不同角色的用户享有不同的价格
    /**
     * {
     *      some_coupon_holder: "111", 某个持有优惠券的用户的价格
     * }
     */
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    imageThumb: String,
    imageCover: String,
    images: [{type: String}],
    description: String,
    properties: Object,
    specification: String,
    specificationDecription: Object,
    specificationDecriptionPrice_rmb: Object,
    createdAt: { type: Date, default: Date.now },
  });

const Good = mongoose.model('Role', GoodSchema);

export default  Good;