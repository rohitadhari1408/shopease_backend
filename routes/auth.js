const express = require("express");

 const { RegisterUser, LoginUser} = require ('../controller/controller');// Adjust the path as necessary

const router = express.Router();


// Register
router.post("/register", RegisterUser);

// Login
router.post("/login", LoginUser);




module.exports = router;
