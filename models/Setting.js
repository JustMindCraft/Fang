var mongoose = require('mongoose');
const SettingSchema = new mongoose.Schema({
  // 订单始终就是店铺的订单
    name: {type: String, default: require('uuid/v1')()},
    valText: {type: String, default: "unset"},
    valJudge:  {type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const Setting = mongoose.model('Setting', SettingSchema);

export async function setSettingValue(name=null, value="unset"){
    console.log(typeof value);
    let setting = null;
    switch (typeof value) {
        case "string":
            setting= await Setting.findOne({name, valText: value});
            if(setting){
                return "Already Exist"
            }else{
                setting = new  Setting({
                    name,
                    valText: value,
                })
                await setting.save();
                return setting;
            }
        case 'boolean':
            setting= await Setting.findOne({name, valJudge: value});
            if(setting){
                return  "Already Exist"
            }else{
                setting = new  Setting({
                    name,
                    valJudge: value,
                })
                await setting.save();
                return setting;
            }
        default:
            return "UNSUPPORT TYPE "+(typeof value).toString();
    }
    
    
}

export async function getSettingValue(name=null){
    let setting= await Setting.findOne({name});
    if(!setting){
        return null;
    }
    if(setting.valText){
        return setting.valText;
    }
    if(setting.valJudge){
        return setting.valJudge;
    }
    return null;
}

export default  Setting;