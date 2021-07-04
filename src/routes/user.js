const Router = require('express').Router;

const { authController } = require('../controllers');

const userRouter = Router();

userRouter.route('/register').post(authController.register);
userRouter.route('/login').post(authController.login);

module.exports = userRouter;
