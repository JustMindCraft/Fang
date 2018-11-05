import config from '../config/index';
import User from '../MongoModels/User';
import Role from '../MongoModels/Role';

console.log("正在生成一个超级管理员用户。。。。。。。");

console.log("数据无价，请谨慎操作...............");

var readline = require('readline');

//创建readline接口实例
var  rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});



// question方法
let superUser = {}
rl.question("请输入您超管的邮箱：", async function(answer1){

    let email = answer1;
    console.log("邮箱是"+answer1);
    // 不加close，则不会结束
    rl.question("请输入您超管的密码:",async answer2=>{
        let pass = answer2;
        rl.question("请重复您超管的密码:",async answer3=>{
            let pass_repeat = answer3;
            if(pass!==pass_repeat){
                console.log("两次密码不一致");
                console.log("停止生成。。。。请重试");
                
                rl.close();

            }else{
                if(config.db.driver === "mongo"){
                    var mongoose = require('mongoose');
                    await mongoose.connect(config.mongodb.url);
                    
                    superUser.email = email;
                    superUser.username = email;


                    const bcrypt = require('bcrypt-nodejs');
                    var salt = bcrypt.genSaltSync(Math.random());
                    var hash = bcrypt.hashSync(pass, salt);  
                    superUser.password = hash;    
                    console.log(superUser);
                    try {
                        let user =  new User(superUser);
                        let role =  new Role({name: "superAdmin"})
                       
                        let role_count = await Role.find({name: "superAdmin"}).countDocuments();
                        if(role_count!==0){
                            role = await Role.findOne({name: "superAdmin"});
                        }
                        user.roles.push(role);
                        role.users.push(user);
                         await user.save();
                         await role.save();
                         console.log("新超级管理员创建成功!");
                         
                        rl.close();

                        
                    } catch (error) {
                        if(error){
                            console.log(error);
                            
                        }
                        rl.close();

                        
                    }
                    
                    
                    

                }
                
               
                
            }
        })
    })
    
});

// close事件监听
rl.on("close", function(){
   // 结束程序
    process.exit(0);
});