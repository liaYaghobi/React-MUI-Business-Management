const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")

router.post("/add_item", async (req, res) => {
    console.log(req.body)
    const response = await invController.add_item(req, res)
    res.status(200).send(response)
})

router.delete("/delete_item/:item_name", invController.delete_item)

router.delete("delete_all", invController.delete_all)

router.get("/inventory/:item_name", invController.detail)

router.get("/getAll", invController.getAll)

router.get("/test", async (req, res) => {
    res.send("hello, testing get request")
})

module.exports = router