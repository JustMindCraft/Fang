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
rl.question("请输入您超管的邮箱：",function(answer1){

    let email = answer1;
    console.log("邮箱是"+answer1);
    // 不加close，则不会结束
    rl.question("请输入您超管的密码:", answer2=>{
        let pass = answer2;
        rl.question("请重复您超管的密码:", answer3=>{
            let pass_repeat = answer3;
            if(pass!==pass_repeat){
                console.log("两次密码不一致");
                console.log("停止生成。。。。请重试");
                
                rl.close();

            }else{
                superUser.email = email;
                superUser.password = pass;
                superUser.role_names = ["admin", "nobody"]

                console.log(superUser);
                rl.close();
                
            }
        })
    })
    
});

// close事件监听
rl.on("close", function(){
   // 结束程序
    process.exit(0);
});

