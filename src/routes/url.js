const Router = require('express').Router;

const { urlController }  = require('../controllers');
const { auth } = require('../middleware');

const urlRouter = Router();

// TODO: add a sign/signup form for user login, UI to be done
urlRouter.route('/short').post(auth, urlController.create);
urlRouter.route('/:shortid').get(urlController.getByShortId);

module.exports = urlRouter;
