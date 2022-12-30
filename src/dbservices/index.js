const { CustomerRepo } = require('./customer.table');
const { LinkRepo } = require('./link.table');
const { PictureRepo } = require('./picture.table');

const userRepo = new CustomerRepo();

module.exports = {
  userRepo,
  LinkRepo,
  PictureRepo,
};
