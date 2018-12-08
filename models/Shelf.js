import ShelfPositionGood from './ShelfPositionGood';

var mongoose = require('mongoose');
const ShelfSchema = new mongoose.Schema({
    name: String,
    name_zh: String,
    description: String,
    rowSize: { type: Number, default: 4 }, //货架横大小,不得超过10
    columnSize:  { type: Number, default: 15 },//货架纵大小,不得超过30
    isDefault: Boolean, // 默认货架
    pushablePosition: { type: Array, default: [0,0] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const Shelf = mongoose.model('Shelf', ShelfSchema);

export async function addGoodToShelf(goodId, shelfId){
    let shelf = await Shelf.findById(shelfId);
    let newShelfPostion = new ShelfPositionGood({
        shelf: shelfId,
        good: goodId,
        positonX: shelf.pushablePosition[0],
        positonY: shelf.pushablePosition[1],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        isFull: false,
    });
    //更新货架新的插入点;
    let x = shelf.pushablePosition[0];
    let y = shelf.pushablePosition[1];

    if(x===shelf.rowSize-1){
        if(y<shelf.columnSize-1){
            y=y+1;
            x=0;
        }else{
            return "货架已满"
        }
       
    }else{
       x=x+1
       
    }
    shelf.pushablePosition = [x,y];
    await shelf.save();
  

    await newShelfPostion.save();


    return newShelfPostion;
    
}


export default  Shelf;