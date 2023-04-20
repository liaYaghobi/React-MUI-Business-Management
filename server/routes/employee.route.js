const express = require("express")
const router = express.Router()
const employeeController = require("../controllers/employeeController")

router.post("/add_employee", async (req, res) => {
    console.log(req.body)
    const response = await employeeController.add_employee(req, res)
    res.status(200).send(response)
})

router.delete("/delete_employee/:employee_name", employeeController.delete_employee)

router.get("/employee/:employee_name", employeeController.detail)

router.get("/getAll", employeeController.getAll)

router.get("/test", async (req, res) => {
    res.send("hello, testing get request")
})

module.exports = router