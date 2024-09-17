const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchusers = require('../middleware/fetchuser');

const jwt_secret = "mayurisagoodboy";

// ROUTE:1 create a user using post '/api/auth/createUser'. no login required
router.post('/createUser', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Enter valid password ').isLength({ min: 5 })
], async (req, res) => {

    let success = false;
    // If there are errors then return an error message
    const err = validationResult(req);
    if (!err.isEmpty()) {
        success = false;
        return res.status(400).json({ success, error: err.array() });
    }

    try {
        // check whether the user with this email has already registered
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "Sorry, a user with that email already exists" })
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create
            ({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_secret);

        // res.json({ user })
        success = true;
        res.json({ success, authToken })
    }
    // when server error occurs
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }

});

// ROUTE:2 Authenticate a user using post '/api/auth/login'. no login required
router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {

    let success = false;
    // If there are errors then return an error message
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ error: err.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const paswordCompare = await bcrypt.compare(password, user.password);
        if (!paswordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, jwt_secret);
        success = true;
        res.json({ success, authToken });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE:3 Get loggedin user detail using post '/api/auth/getUser'. login required
router.post('/getUser', fetchusers, async (req, res) => {
    try {
        user_id = req.user.id;
        const user = await User.findById(user_id).select("-password");
        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;