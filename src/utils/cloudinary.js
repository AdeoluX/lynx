const { v2 } = require('cloudinary');
const { abortIf } = require('./responder');
const httpStatus = require('http-status');

v2.config({
  cloud_name: 'dn504iflx',
  api_key: '955546196647732',
  api_secret: 'ZndOMlOHNRVgVo8rm0EAeJiI11g',
});

const cloudinaryUpload = (image) => {
  const upload = v2.uploader
    .upload(image.tempFilePath, {
      resource_type: 'auto',
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      abortIf(error, httpStatus.BAD_REQUEST, 'Failed to upload');
      return { status: false };
    });
  return upload;
};

module.exports = {
  cloudinaryUpload,
};
