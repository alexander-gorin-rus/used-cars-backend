const mongoose = require('mongoose');


const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });
      console.log('Mongo Data Base connected');
    } catch (err) {
      console.error(err.message);
      //Exit process with error
      process.exit(1);
    }
  };
  module.exports = connectDB;