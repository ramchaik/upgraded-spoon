const User = require('../models/user');

const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    req.session.user = newUser;
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'user not found',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'incorrect username or password',
      });
    }

    req.session.user = user;
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};
