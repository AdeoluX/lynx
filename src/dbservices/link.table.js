const Link = require('../models/Links');

class LinkRepo {
  static create = async (data) => {
    const customer = await new Link(data).save();
    return customer;
  };

  static update = async (_id, data) => {
    const update = await Link.findOneAndUpdate(
      { _id },
      { ...data },
      { returnDocument: 'after' }
    );
    return update;
  };

  static findLink = async (condition) => {
    const link = await Link.findOne(condition);
    return link;
  };

  static findAll = async (condition) => {
    const link = await Link.find(condition);
    return link;
  };

  // static searchCustomerByEmail = async (email) => {
  //   const link = await Link.find({ email: { $regex: '.*' + email + '.*' } });
  //   return link;
  // };
}

module.exports = {
  LinkRepo,
};
