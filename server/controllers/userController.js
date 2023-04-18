const User = require("../models/user.model")
const async = require("async")
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    console.log(req.body.isAdmin)
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
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

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const user = await User.findOne({ username });
  
      // If user is not found, return error message
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
  
      // Check if password is correct
      const isMatch = await user.comparePassword(password);
  
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }
  
      // Successful login
      return res.status(200).json({ success: true, isAdmin: user.isAdmin, username: user.username, email: user.email });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  