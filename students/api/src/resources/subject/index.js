const router = require('koa-router')();
const subjectController = require('./subject.controller');

router.get('/', subjectController.getList);
router.post('/', subjectController.create);
router.get('/:id', subjectController.findById);
router.put('/:id/archive', subjectController.archive);

module.exports = router.routes();
