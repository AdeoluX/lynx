// const catchAsync = require('../utils/catchAsync');
const catchAsync = require('../utils/catchAsync');
const { CustomerService } = require('../services');
const {
  successResponse,
  abortIf,
  redirect,
  download,
  downloadPdfFile,
  downloadFile,
} = require('../utils/responder');
const { paginate, paginateOptions } = require('../utils/paginate');

const customerService = new CustomerService();

const createLinks = catchAsync(async (req, res, next) => {
  const result = await customerService.createLinks(req.body, req.user_id);
  return successResponse(req, res, result);
});

const joinLinks = catchAsync(async (req, res, next) => {
  const result = await customerService.joinLinks(req.body, req.user_id);
  return successResponse(req, res, result);
});

const addPicturesToLink = catchAsync(async (req, res, next) => {
  const result = await customerService.addPicturesToLink(
    req.files.image,
    req.body,
    req.params.link_id
  );
  return successResponse(req, res, result);
});

const getAllLinks = catchAsync(async (req, res, next) => {
  const result = await customerService.getAllLinks(req.user_id);
  return successResponse(req, res, result);
});

const getLinkPictures = catchAsync(async (req, res, next) => {
  const result = await customerService.getLinkPictures(req.params.link_id);
  return successResponse(req, res, result);
});

const downloadPictures = catchAsync(async (req, res, next) => {
  const result = await customerService.downloadPictures(req.params.picture_id);
  return successResponse(req, res, result);
});

module.exports = {
  createLinks,
  joinLinks,
  addPicturesToLink,
  getAllLinks,
  getLinkPictures,
  downloadPictures,
};
