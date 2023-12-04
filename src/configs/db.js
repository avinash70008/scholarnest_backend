
const mongoose = require("mongoose");

const connect = async () => {
  try {
    return await mongoose.connect(
      "mongodb+srv://avinash:avinash1@cluster0.3hh5ta3.mongodb.net/scholarnestusers"
    );
  } catch (err) {
    console.log("error form connection :", err.message);
  }
};

module.exports = connect;
