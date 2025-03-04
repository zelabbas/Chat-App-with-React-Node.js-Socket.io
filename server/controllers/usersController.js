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


module.exports.login = async (req, res, next) => {
  try {
    const {username, password} = req.body;
    console.log(username, password);
    const user = await User.findOne({ username});
    if (!user)
        return res.json({ status: false, message: 'Invalid username or password'});
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
        return res.json({ status: false, message: 'Invalid username or password'});
    user.password = undefined;
    return res.json({ status: true, user});
  }catch(err) {
    console.error(err);
    next(err);
  }
};


module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImg = req.body.image
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage : avatarImg
        });
        return res.json({isSet:userData.isAvatarImageSet, image:userData.avatarImage});
    }catch(err) {
        next(err);
    }
}
