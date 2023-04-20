const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Register Endpoint 
router.post("/register", async (req, res) => {
    console.log(req.body);
    await userController.register(req, res);
});

router.post("/login", async (req, res) => {
    console.log(req.body);
    await userController.login(req, res);
});

module.exports = router;