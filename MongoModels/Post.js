var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  });

  const Post = mongoose.model('Post', PostSchema);

  export default  Post;