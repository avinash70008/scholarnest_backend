const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./src/configs/db");
const { register, login, editProfile } = require("./src/controllers/auth.controller");
const authMiddleware = require("./src/middleware/authMiddleware");

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);
app.put("/editProfile", authMiddleware, editProfile); 


app.listen(5000, async () => {
  try {
    await connect();
    console.log("Connected Successful on Port 5000");
  } catch (err) {
    console.log(err.message);
  }
});
