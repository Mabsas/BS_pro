const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");


const User = require("./routes/user");
const Books = require("./routes/book");
const Favourites = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    credentials: true,
    
};

app.use(cors(corsOptions));
app.use(express.json());

//routes
app.use("/api/v1", User);    //for sigup & signin user
app.use("/api/v1", Books);
app.use("/api/v1", Favourites);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
//creating port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});
