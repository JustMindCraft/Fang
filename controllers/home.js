import Post from '../models/Post';

export default {
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        try {
            let post  =  new Post({title: "测试页面33334228", body: "测试主页内容34"});

            await post.save();
            post = await Post.one({title: "测试页面33334228"});

            console.log(post.tags);
            

            

            
        } catch (error) {
            console.error(error);
            
        }
        

        
        
        
        return `welcome`;
    }
}