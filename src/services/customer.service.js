const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { userRepo, LinkRepo, PictureRepo } = require('../dbservices');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const { userDTO } = require('../DTOs/user.dto');
const { cloudinaryUpload } = require('../utils/cloudinary');
const { generateSlug } = require('random-word-slugs');

class CustomerService {
  createLinks = async (data, user_id) => {
    let user = await userRepo.findCustomer({ _id: user_id });
    data.slug = generateSlug(5);
    abortIf(!user, httpStatus.NOT_FOUND, 'User Does not exist');
    const link = await LinkRepo.create(data);
    user.links.push(link);
    user.save();
    return link;
  };

  joinLinks = async (data, user_id) => {
    const link = await LinkRepo.findLink({ _id: data.link_id });
    abortIf(!link, httpStatus.NOT_FOUND, 'Link Does not exist');
    let user = await userRepo.findCustomer({ _id: user_id });
    abortIf(!user, httpStatus.NOT_FOUND, 'User Does not exist');
    user.links.push(link);
    user.save();
    return user;
  };

  addPicturesToLink = async (files, data, link_id) => {
    //upload image
    const upload = await cloudinaryUpload(files);
    const data_ = {
      image: upload.secure_url,
      link_id,
    };
    const picture = await PictureRepo.create(data_);
    return picture;
  };

  getAllLinks = async (user_id) => {
    const users = await userRepo.findCustomer({ _id: user_id });
    return users.links;
  };

  getLinkPictures = async (link_id) => {
    const pics = await PictureRepo.findAll({ link_id });
    return pics;
  };

  downloadPictures = async () => {
    const users = await userRepo.findAll({});
    return users;
  };
}

module.exports = {
  CustomerService,
};
