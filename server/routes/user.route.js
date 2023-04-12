const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

// Register Endpoint 
router.post("/register", async (req, res) => {
    console.log(req.body)
    const response = await userController.register(req, res)
    res.status(200).send(response)
})

module.exports = router