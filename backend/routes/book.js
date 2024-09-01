const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");


//add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; //requiring id of user to check if he is user admin so he can add book
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "Only accessible to admin" });
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: "Book Added Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
