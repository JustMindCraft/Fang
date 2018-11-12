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
    status: { type: String, default: "untouched" },
    createdAt: { type: Date, default: Date.now },
    report: String,

  });

  const Customer = mongoose.model('Customer', CustomerSchema);

  export default  Customer;