const multer = require('koa-multer');
const router = require('koa-router')();
const userController = require('./user.controller');
const config = require('config');

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, config.pathToUpload),

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`);
  },
});

const limits = {
  fileSize: 5000000,
};

const upload = multer({ storage, limits });

router.get('/', userController.getList);
router.post('/', userController.create);
router.get('/:id', userController.findById);
router.put('/:id', userController.update);
router.put('/:id/archive', userController.archive);
router.post('/photo', upload.single('avatar'), userController.uploadPhoto);

module.exports = router.routes();
