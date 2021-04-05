const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true
   },
   password: {
       type: String,
       required: true
   },
   role: {
       type: String,
       default: 'user'
   }
}, {timestamps: true});

module.exports = mongoose.model("user", userSchema);
