// models/user.js
const mongoose = require('mongoose');

// const Testimony = require('./Prayer');
// const Prayer = require('./Prayer');

const { Schema } = mongoose;

const PictureSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  link_id: {
    type: String,
    required: true,
  },
});

const Picture = mongoose.model('Picture', PictureSchema);

// UserSchema.pre('remove', async (document) => {
//   const user_id = document._id;
//   await Prayer.deleteMany({ user: user_id });
//   await Testimony.deleteMany({ user: user_id });
// });

module.exports = Picture;
