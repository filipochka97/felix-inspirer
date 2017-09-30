const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');
const getColors = require('get-image-colors');
const config = require('config');

const userService = require('./user.service');

const userCreateValidator = require('./validators/userCreate.validator');
const userUpdateValidator = require('./validators/userUpdate.validator');
const userQueryValidator = require('./validators/userQuery.validator');

const safeDelete = (filePath) => {
  fs.unlink(filePath, () => true);
  return true;
};

module.exports.create = async (ctx) => {
  const data = await userCreateValidator(ctx);
  if (!data.isValid) {
    return;
  }

  const userData = {
    status: 'active',
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    photoUrl: data.photoUrl,
    photoColors: data.photoColors,
  };

  ctx.body = await userService.create(userData);
};

module.exports.update = async (ctx) => {
  const data = await userUpdateValidator(ctx);
  if (!data.isValid) {
    return;
  }

  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    photoUrl: data.photoUrl,
    photoColors: data.photoColors,
  };

  const oldUser = await userService.findById(ctx.params.id);
  const oldPhotoUrl = oldUser.photoUrl;
  const photoUrl = user.photoUrl;

  if (oldUser && oldPhotoUrl !== photoUrl) {
    const oldPhotoName = path.basename(oldPhotoUrl);
    if (oldPhotoName !== 'default.jpg') {
      safeDelete(`${config.pathToUpload}/${oldPhotoName}`);
    }
  }

  ctx.body = await userService.update(ctx.params.id, user);
};

module.exports.archive = async (ctx) => {
  ctx.body = await userService.archive(ctx.params.id);
};

module.exports.getList = async (ctx) => {
  const data = await userQueryValidator(ctx);
  if (!data.isValid) {
    return;
  }


  const query = {
    status: 'active',
  };

  const options = {
    page: data.page,
    perPage: data.perPage,
    sort: { firstName: 1, lastName: 1 },
  };

  const usersList = await userService.getList(query, options);

  ctx.body = usersList;
};

module.exports.findById = async (ctx) => {
  ctx.body = await userService.findById(ctx.params.id);
};

module.exports.uploadPhoto = async (ctx) => {
  const { filename, destination } = ctx.req.file;

  const newFilename = `${path.basename(filename, path.extname(filename))}-${config.imageSize}.jpeg`;
  const photoUrl = `${config.baseUrl}/photo/${newFilename}`;
  const newPath = `${destination}/${newFilename}`;

  const photo = await Jimp.read(ctx.req.file.path);
  await new Promise((resolve, reject) => {
    const fitted = photo
      .clone()
      .contain(config.imageSize, config.imageSize);
    photo.background(0xC5C5C5FF)
      .cover(config.imageSize, config.imageSize)
      .blur(100)
      .composite(fitted, 0, 0)
      .write(newPath, resolve);
  });

  safeDelete(ctx.req.file.path);

  const photoColors = (await getColors(newPath))
    .map(color => color.alpha(0.5).css());

  ctx.body = { photoUrl, photoColors };
};

