const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Books = require("./routes/book");
app.use(express.json());

//routes
app.use("/api/v1", User);    //for sigup & signin user
app.use("/api/v1", Books);
//creating port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});
