const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log(error, "DB not connected");
  }
};

(async () => {
  await connectDB();
})();

module.exports = {
  connectDB,
};
