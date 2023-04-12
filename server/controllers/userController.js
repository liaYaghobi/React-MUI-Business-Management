const User = require("../models/user.model")
const async = require("async")

exports.register = async (req, res) => {
    console.log(req.body.isAdmin)
    try {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,//hash it up here?
            isAdmin: req.body.isAdmin
        })

        console.log(user);

        try {
            return await user.save()
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}