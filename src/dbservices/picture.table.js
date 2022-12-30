const Picture = require('../models/Pictures');

class PictureRepo {
  static create = async (data) => {
    const create = await new Picture(data).save();
    return create;
  };

  static update = async (_id, data) => {
    const update = await Picture.findOneAndUpdate(
      { _id },
      { ...data },
      { returnDocument: 'after' }
    );
    return update;
  };

  static find = async (condition) => {
    const find = await Picture.findOne(condition);
    return find;
  };

  static findAll = async (condition) => {
    const findAll = await Picture.find(condition);
    return findAll;
  };
}

module.exports = {
  PictureRepo,
};
