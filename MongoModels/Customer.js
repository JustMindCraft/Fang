var mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
    name:  {
        type: String,
        index: true,
      },
    mobile:  {
        type: String,
        index: true,
        unique: true
    },
    projectTypeInterested: String,
    email: String,
    note: String,
  });

  const Customer = mongoose.model('Customer', CustomerSchema);

  export default  Customer;