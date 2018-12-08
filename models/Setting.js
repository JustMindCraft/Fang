var mongoose = require('mongoose');
const SettingSchema = new mongoose.Schema({
  // 订单始终就是店铺的订单
    name: String,
    valText: String,
    valJudge: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

const Setting = mongoose.model('Setting', SettingSchema);

export async function setSettingValue(name, value){
    console.log(typeof value);
    let setting = null;
    switch (typeof value) {
        case "string":
            setting= await Setting.findOne({name, valText: value});
            if(setting){
                return {
                    msg: "Already Exist"
                }
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
                return {
                    msg: "Already Exist"
                }
            }else{
                setting = new  Setting({
                    name,
                    valJudge: value,
                })
                await setting.save();
                return setting;
            }
        default:
            return {
                msg: "UNKNOW ERROR"
            }
    }
    
    
}

export async function getSettingValue(name){
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