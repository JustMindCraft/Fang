var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GoodClassSchema = new mongoose.Schema({
    name:  String,//在一个app内不可重名
    name_zh: String,
    shop: { type: Schema.Types.ObjectId, ref: 'App' },
    app: { type: Schema.Types.ObjectId, ref: 'App' },
    createdAt: { type: Date, default: Date.now },
    default: Boolean,//默认的分类是规定不可以删除的
  });

const GoodClass = mongoose.model('Role', GoodClassSchema);

export default  GoodClass;