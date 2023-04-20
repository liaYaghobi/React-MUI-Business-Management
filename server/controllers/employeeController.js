const Employee = require("../models/employee.model")
const async = require("async")

exports.getAll = (req, res, next) => {
    Employee.find({}, (err, employees) => {
        if (err) {
          return next(err);
        }
        // Successful, so send response with the employees array
        res.send(employees);
      });        
  }  

exports.detail = (req, res, next) => {
    async.parallel(
        {
            qs(callback) {
                Employee.findOne({employee_name: req.params.employee_name}).exec(callback)
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
              }
              if (results.qs == null) {
                // No results.
                const err = new Error("Employee not found");
                err.status = 404;
                return next(err);
              }
              // Successful, so send response, but what about displaying it?
              res.send(results.qs)
        }
    )
}

exports.add_employee = async (req, res) => {
    //basic validation
    if (!req.body.employee_name) {
        res.status(400).send({ message: "Employee must have a name!"});
        return;
    }

    try {

        const employee = new Employee({
            employee_name: req.body.employee_name,
            employee_branch: req.body.employee_branch,
            employee_title: req.body.employee_title,
            employee_salary: req.body.employee_salary //....this was legit my issue ._. 
        })

        console.log(employee);

        try {
            return await employee.save()
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}

exports.delete_employee = (req, res, next) => {
    async.parallel(
        {
            qs(callback) {
                Employee.deleteOne({employee_name: req.params.employee_name}).exec(callback)
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
              }
              if (results.qs == null) {
                // No results.
                const err = new Error("Employee not found");
                err.status = 404;
                return next(err);
              }
              // Successful, so send response, but what about displaying it?
              res.send(results.qs)
        }
    )
}