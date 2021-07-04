const Router = require('express').Router;

const { urlController }  = require('../controllers');
const { auth } = require('../middleware');

const urlRouter = Router();

urlRouter.route('/short').post(auth, urlController.create);
urlRouter.route('/:shortid').get(urlController.getByShortId);

module.exports = urlRouter;
