var exec = require('child_process').exec;

function demoInputShow(){
    return "npm run gModel New title:String body:String hasMany:Comment belongsTo:User"
}
console.log('正确例子是：', demoInputShow());
console.log('本脚本用于自动生成model, 尚未完成, 敬请期待');

let modelName = ""
let feildsString = '';
let modelReference = [];
for (let index = 2; index < process.argv.length; index++) {
    if(index === 2){
        modelName = process.argv[index];
        exec('echo 正在创建模型 ' + modelName+ "......", function(err, stdout, stderr) {
            if (err) {
                console.error('输入错误');
                console.log('正确的例子：', demoInputShow());
                
                throw err
            };
          });
    }else{
        let inputStrs = process.argv[index].split(':');
        if(!inputStrs[0]){
            console.error('命令错误');
            console.error('正确的例子如下：');
            console.error(demoInputShow);
            
            process.exit(1);
        }
        if(inputStrs[0] === "hasMany" || 
            inputStrs[0]==="belongsTo" || 
            inputStrs[0] === "hasOne" ||
            inputStrs[0] === "hasManyAndBelongsTo" 
        ){
            modelReference.push(inputStrs[1]);
        }
        feildsString += 
        `
            ${inputStrs[0]}: ${inputStrs[1]},
        `;
        
        
    }
    
}

console.log(feildsString);

if(!process.argv[3]){
        console.error('请给模型一些字段');
        console.log('正确例子是：', demoInputShow());
        process.exit(1);
}

let modelReferenceStr = '';

for (let j = 0; j < modelReference.length; j++) {
    const model = modelReference[j];
    modelReferenceStr += 
`
import ${model} from './${model}.js';
`;
    
    
}

let modelFile = 
`
import AppModel from '../core/model';

${modelReferenceStr}

export default class ${modelName} extends AppModel {
    constructor(feilds){
        super(feilds);
        this.validFields({
            ${feildsString}
        })
    }
}

`



 var fs = require('fs')
var path=require('path');

var modelPath = path.resolve(__dirname, '..')+"/models/"+modelName+".js"; 
var w_data = Buffer.from(modelFile);

/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
fs.exists(modelPath, function(exists){ 
    if(exists){ 
       console.log(modelPath, '已经存在'); 
       console.log("删除"+modelPath); 
       fs.unlinkSync(modelPath)
    }
    fs.writeFile(modelPath, w_data, {flag: 'a'}, function (err) {
        if(err) {
    console.error(err);
    } else {
    console.log('成功创建'+ modelPath);
    }
    });
});

//基于model生成api文件


//基于model生成基本的页面管理文件








