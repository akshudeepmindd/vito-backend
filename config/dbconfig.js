const dbUrl = require ('constants/dbConst').dbUrl;
const mongoose = require ('mongoose');

const connectDB = () => {
  try {
    mongoose.connect (dbUrl, {
      useFindAndModify: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log ('mongo not connected', error);
  }
};

module.exports = connectDB;