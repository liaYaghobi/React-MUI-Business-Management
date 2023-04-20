const express = require("express")
const router = express.Router()
const branchController = require("../controllers/branchController")

router.post("/add_branch", async (req, res) => {
    console.log(req.body)
    const response = await branchController.add_branch(req, res)
    res.status(200).send(response)
})

router.delete("/delete_branch/:branch_name", branchController.delete_branch)

router.get("/branch/:branch_name", branchController.detail)

router.get("/getAll", branchController.getAll)

router.get("/test", async (req, res) => {
    res.send("hello, testing get request")
})

module.exports = router