var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const PACLSchema = new mongoose.Schema({
    name:  {
        type: String,
        index: true,
        unique: true
      },
    path:  {
        type: String,
        index: true,
        unique: true
      },
    scope: Array,
    isFold: Boolean
  });

  const PACL = mongoose.model('PACL', PACLSchema);

  export default  PACL;