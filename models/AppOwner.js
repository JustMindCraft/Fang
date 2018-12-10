import defaultFields from '../config/defaultFields';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppOwnerSchema = new mongoose.Schema({
    app: { type: Schema.Types.ObjectId, ref: 'App', default: null },
    owner: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    status: { type: String, default: 'normal' },
    ...defaultFields
  });

const AppOwner = mongoose.model('AppOwner', AppOwnerSchema);

export async function getOwner(appId="unknown"){
  
  let appOwner = await AppOwner.findOne({app: appId, isDeleted: false}).populate('owner',{isDeleted: false});
  
  return appOwner? appOwner.owner: null;
}

export default  AppOwner;