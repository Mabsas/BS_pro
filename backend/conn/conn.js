const mongoose = require("mongoose");


//creating connection with the db
const conn = async () => {
    try {
        await mongoose.connect(`${process.env.URI}`);
        console.log("Connected to Database");
    }catch (error) {
        console.log(error);
    }
};

//running the db by calling
conn();
