const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    console.log(username, email, password);

    const usernameExists = await User.findOne({
        username
    });

    if (usernameExists) {
        return res.json({
            status: false,
            message: 'Username already exists'
        });
    }

    const emailCheck = await User.findOne({
        email
    });

    if (emailCheck) {
        return res.json({
            status: false,
            message: 'Email already used'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    console.log('User created:', user.password);
    user.password = undefined;

    return res.json({
        status: true,
        user
    });

  }catch(err){
    console.error(err);
    next(err);
  }
};