const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");


//add to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid,id } = req.headers;
        const userData = await User.findById(id);
        const isBookinCart = userData.cart.includes(bookid);

        if(isBookinCart){
            return res.json({ status: "Success",
                message: "Book is already in cart",
             });
        }
        await User.findByIdAndUpdate(id,{
            $push: {cart: bookid},
        });

        return res.json({ status: "Success",
            message: "Book added to cart",
         });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured" });
    }
});

//remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id,{
            $pull: {cart: bookid},
        });

        return res.json({ status: "Success",
            message: "Book removed from cart",
         });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occured" });
    }
});

module.exports = router;