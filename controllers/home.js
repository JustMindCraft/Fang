import Post from '../models/Post';

export default {
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        let post  = new Post({title: "测试页面", body: "测试主页内容"});
        let tags = post.tags;
        post.save();
        console.log(post);
        console.log(tags);
        
        
        return `welcome`;
    }
}