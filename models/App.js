var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AppSchema = new mongoose.Schema({
    secret: String,
    masterSecret: String,
    name: String,
    name_zh: String,
    user:  { type: Schema.Types.ObjectId, ref: 'User' },
    users:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
    type: String,
    shops: [{ type: Schema.Types.ObjectId, ref: 'Shop' }],
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    storage: { type: Schema.Types.ObjectId, ref: 'Storage' },
  });

const App = mongoose.model('App', AppSchema);

export default  App;