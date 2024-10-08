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

// update book 
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        res.status(200).json({ message: "Book Updated Successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occured!" });
    }
});

//delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted Successfully", });
    } catch (error) {
        res.status(500).json({ message: "An error occured!" });
    }
});

//get all books
router.get("/get-all-books",  async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occured!" });
    }
});


//get recently added books for home page limit to 4
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occured!" });
    }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const books = await Book.findById(id);
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occured!" });
    }
});



// NEW: Search Books by Title or Author
// This is the new route for searching books by title (book name) or author (writer's name).
router.get("/search-books", async (req, res) => {
    try {
        const { query } = req.query; // Get the search query from the request
        
        // Find books where the title or author contains the query string (case-insensitive)
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Search by book title
                { author: { $regex: query, $options: 'i' } } // Search by author's name
            ]
        });

        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred!" });
    }
});


// Get book prices and titles
router.get("/get-book-prices", async (req, res) => {
    try {
        const books = await Book.find({}, { title: 1, price: 1 }); // Select only titles and prices
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred!" });
    }
});


 


module.exports = router;
