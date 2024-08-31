const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




//Sign Up 
router.post("/sign-up", async (req, res) => {

    try {

        const { username, email, password, address } = req.body;


        //check username length is more than 3

        if (username.length < 4) {

            return res
                .status(400)
                .json({ message: "Username length should be greater than 3 " });
        }

        //check username already exist ?

        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {

            return res
                .status(400)
                .json({ message: "Username already exists " });
        }



        //check email already exist ?

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {

            return res
                .status(400)
                .json({ message: "Email already exists " });
        }


        //check password kength 
        if (password.length <= 5) {

            return res
                .status(400)
                .json({ message: "Password's length should be greater than 5" });
        }

        const hashPass = await bcrypt.hash(password, 10);   // bcrypt for protecting password

        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address
        });
        await newUser.save();
        return res.status(200).json({ message: "SignUp Successfully" });

    } catch (error) {

        res.status(500).json({ message: "Internal server error" });
    }
});



//Sign In 
router.post("/sign-in", async (req, res) => {

    try {

        const { username, password } = req.body;

        //checking if username exist or not
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            res.status(400).json({ message: "Invalid Credentials!" });
        }


        //if username exist then checking if pass and username is correct or not
        await bcrypt.compare(password, existingUser.password, (err, data) => {

            if (data) {
                const authClaims = [
                    { name: existingUser.username },
                    { role: existingUser.role },
                ];
                const token = jwt.sign({ authClaims }, "bookstore123", {
                    expiresIn: "30d",
                });
                res.status(200).json({
                    id: existingUser._id,
                    role: existingUser.role,
                    token: token,
                });
            } else {
                res.status(400).json({ message: "Invalid Credentials!" });
            }
        });

    } catch (error) {

        res.status(500).json({ message: "Internal server error" });
    }
});


//get-user info
router.get("")

module.exports = router;
