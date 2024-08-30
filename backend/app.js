const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn");
const User = require ("./routes/user");


//routes
app.use("/api/v1",User);    //for sigup & signin user
//creating port
app.listen(process.env.PORT,() => {
    console.log(`Server Started at port ${process.env.PORT}`);
});
