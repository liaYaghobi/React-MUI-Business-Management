const mongoose = require("mongoose")

const InventorySchema = new mongoose.Schema({
    item_name: {type: String, required: true},
    stock_count: {type: Number, required: true}//make 0 or positive only?
})

const Inventory = mongoose.model("Inventory", InventorySchema)

module.exports = Inventory