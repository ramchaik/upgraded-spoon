const Router = require('express').Router;

const urlController = require('../controllers');

const urlRouter = Router();

urlRouter.post('/short', urlController.create);
urlRouter.get('/:shortid', urlController.getByShortId);

module.exports = urlRouter;
