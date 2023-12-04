const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./configs/db");
const { register, login, editProfile, getUserDetails } = require("./controllers/auth.controller");
const authMiddleware = require("../src/middleware/authMiddleware");

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);
app.put("/editProfile", authMiddleware, editProfile); 
app.get('/login/:userId', getUserDetails);

app.listen(5000, async () => {
  try {
    await connect();
    console.log("Connected Successful on Port 5000");
  } catch (err) {
    console.log(err.message);
  }
});
