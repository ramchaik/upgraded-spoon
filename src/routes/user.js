const Router = require('express').Router;

const { authController } = require('../controllers');

const userRouter = Router();

userRouter.route('/signup').post(authController.signUp);
userRouter.route('/login').post(authController.login);

module.exports = userRouter;
