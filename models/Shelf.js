var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShelfSchema = new mongoose.Schema({
    name: String,
    name_zh: String,
    description: String,
    rowSize: Number, //货架横大小,不得超过10
    columnSize: Number,//货架纵大小,不得超过30
    isDefault: Boolean, // 默认货架
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const Shelf = mongoose.model('Shelf', ShelfSchema);

export async function setDefaultShelf(shop){
    let shelf = await Shelf.findOne({isDefault: true, shop})
    if(!shelf){
        shelf = new Shelf({
            name: "mainsalegoods",
            name_zh: "主打商品",
            description: "",
            rowSize: 6, //货架横大小
            columnSize: 4,//货架纵大小
            positionGoods: {},//货架占用情况
            shop,
            isDefault: true, // 默认货架
            createdAt: new Date(),
        })
        await shelf.save();
    }
    return shelf;
}

export default  Shelf;