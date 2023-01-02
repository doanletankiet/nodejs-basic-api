const express = require("express");
const app = express();
const connectDb = require("./Servers/ConnectDbService");

const userRoute = require("./Router/UserRouter");
const authRouter = require("./Router/AuthRouter");
const postRouter = require("./Router/PostRouter");

const cors = require("cors");
require("dotenv").config();

//middleware apply cors add request

app.use(cors());

// middleware get info from client by req.body
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// connect database
connectDb();

// middleware router

app.use("/auth/admin", userRoute);
app.use("/api/auth", authRouter);
app.use("/api/author", postRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server listening ${process.env.PORT}`);
});
