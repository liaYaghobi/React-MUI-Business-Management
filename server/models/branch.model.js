const mongoose = require("mongoose")

const BranchSchema = new mongoose.Schema({
    branch_name: {type: String, unique: true, required: true},
    branch_location: {type: String, required: true},
})

const Branch = mongoose.model("Branch", BranchSchema)

module.exports = Branch  