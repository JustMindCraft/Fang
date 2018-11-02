import Post from "../models/Post";

export default [
    {
        method: 'GET',
        path: '/',
        config: { auth: false },
        handler: async (request, h) => {
            // var spawn = require('child_process').spawn;
            //     let free = spawn('docker', ['-v']); 

            //     // 捕获标准输出并将其打印到控制台 
            //     free.stdout.on('data', function (data) { 
            //     console.log('standard output:\n' + data); 
            //     }); 

            //     // 捕获标准错误输出并将其打印到控制台 
            //     free.stderr.on('data', function (data) { 
            //     console.log('standard error output:\n' + data); 
            //     }); 

            //     // 注册子进程关闭事件 
            //     free.on('exit', function (code, signal) { 
            //     console.log('child process eixt ,exit:' + code); 
            //     });

            let post  = new Post({title: "faewfa"});
            console.log(post.title);
            
            await post.save();
            await Post.findOne();
            try {
                
                return h.view('index', {
                    title: "正觉工场 |　首页",
                    logined: ""
                });
                
            } catch (error) {
                console.error(error);
                
            }
            
            
            
            
        }
    }
]