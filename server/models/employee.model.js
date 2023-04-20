const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    employee_name: {type: String, unique: true, required: true},
    employee_branch: {type: String, required: true},//make 0 or positive only?
    employee_title: {type: String, required: true},
    employee_salary: {type: Number, required: true}
})

const Employee = mongoose.model("Employee", EmployeeSchema)

module.exports = Employee  