const mongoose = require("mongoose")

const InventorySchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    item_name: {type: String, unique: true, required: true},
    item_count: {type: Number, required: true},//make 0 or positive only?
    item_cost: {type: Number, required: true},
    item_price: {type: Number, required: true}
})

InventorySchema.pre('save', async function () {
    const doc = this;
    // only generate new id for new document
    if (doc.isNew) {
      try {
        const maxDoc = await mongoose.model('Inventory').findOne().sort('-id');
        if (maxDoc) {
          doc.id = maxDoc.id + 1;
        } else {
          doc.id = 1;
        }
      } catch (err) {
        throw err;
      }
    }
  });
  

const Inventory = mongoose.model("Inventory", InventorySchema)

module.exports = Inventory  