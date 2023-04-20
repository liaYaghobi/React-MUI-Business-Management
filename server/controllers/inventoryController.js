const Inventory = require("../models/inventory.model")
const async = require("async")

exports.getAll = async (req, res, next) => {
    try {
      const items = await Inventory.find({});
      res.send(items);
    } catch (err) {
      return next(err);
    }
  };
  

exports.detail = (req, res, next) => {
    async.parallel(
        {
            qs(callback) {
                Inventory.findOne({item_name: req.params.item_name}).exec(callback)
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
              }
              if (results.qs == null) {
                // No results.
                const err = new Error("Item not found");
                err.status = 404;
                return next(err);
              }
              // Successful, so send response, but what about displaying it?
              res.send(results.qs)
        }
    )
}

exports.add_item = async (req, res) => {
    //basic validation
    if (!req.body.item_name) {
        res.status(400).send({ message: "Inventory item must have a name!"});
        return;
    }

    try {

        const inventory = new Inventory({
            item_name: req.body.item_name,
            item_count: req.body.item_count,
            item_cost: req.body.item_cost,
            item_price: req.body.item_price //....this was legit my issue ._. 
        })

        console.log(inventory);

        try {
            return await inventory.save()
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

exports.delete_item = async (req, res, next) => {
    try {
      const result = await Inventory.deleteOne({ item_name: req.params.item_name });
      if (result.deletedCount === 0) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }
      res.send(result);
    } catch (err) {
      return next(err);
    }
  };
  