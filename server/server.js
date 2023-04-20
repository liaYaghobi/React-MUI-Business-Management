require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
const { mongoose, db } = require("./database")
const Inventory = require("./routes/inventory.route")
const User = require("./routes/user.route")
const Branch = require("./routes/branch.route")
const Employee = require("./routes/employee.route")

app.use(cors())
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/inventory', Inventory)
app.use('/user', User)
app.use('/branch', Branch)
app.use('/employee', Employee)

app.get("/", (req, res) => {
    res.send("Hello World")
})

// start the Express server
app.listen(8000, () => {
    console.log("Server started on port http://localhost:8000")
})
//test