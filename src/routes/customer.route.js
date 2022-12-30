const express = require('express');
const { verify } = require('../middleware/verifyToken');
const { signUpValidate } = require('../validations/user.validations');
const {
  addPicturesToLink,
  createLinks,
  downloadPictures,
  getAllLinks,
  getLinkPictures,
  joinLinks,
} = require('../controller/user.controller');

const router = express.Router();

router.use(verify);

// learning
router.post('/create-link', createLinks);

router.post('/join-link', joinLinks);

router.post('/add-pictures/:link_id', addPicturesToLink);

router.get('/get-all-links', getAllLinks);

router.get('/pictures/:link_id', getLinkPictures);

router.get('/download-picture/:picture_id', downloadPictures);

// router.get('/get-all-links')

module.exports = router;
