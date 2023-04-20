const Branch = require("../models/branch.model")
const async = require("async")

exports.getAll = (req, res, next) => {
    Branch.find({}, (err, branches) => {
        if (err) {
          return next(err);
        }
        // Successful, so send response with the branches array
        res.send(branches);
      });        
  }  

exports.detail = (req, res, next) => {
    async.parallel(
        {
            qs(callback) {
                Branch.findOne({branch_name: req.params.branch_name}).exec(callback)
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
              }
              if (results.qs == null) {
                // No results.
                const err = new Error("Branch not found");
                err.status = 404;
                return next(err);
              }
              // Successful, so send response, but what about displaying it?
              res.send(results.qs)
        }
    )
}

exports.add_branch = async (req, res) => {
    //basic validation
    if (!req.body.branch_name) {
        res.status(400).send({ message: "Branch must have a name!"});
        return;
    }

    try {

        const branch = new Branch({
            branch_name: req.body.branch_name,
            branch_location: req.body.branch_location,
        })

        console.log(branch);

        try {
            return await branch.save()
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

exports.delete_branch = (req, res, next) => {
    async.parallel(
        {
            qs(callback) {
                Branch.deleteOne({branch_name: req.params.branch_name}).exec(callback)
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
              }
              if (results.qs == null) {
                // No results.
                const err = new Error("Branch not found");
                err.status = 404;
                return next(err);
              }
              // Successful, so send response, but what about displaying it?
              res.send(results.qs)
        }
    )
}