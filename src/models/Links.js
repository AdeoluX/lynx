// models/user.js
const mongoose = require('mongoose');

// const Testimony = require('./Prayer');
// const Prayer = require('./Prayer');

const { Schema } = mongoose;

const LinkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const Link = mongoose.model('Link', LinkSchema);

// UserSchema.pre('remove', async (document) => {
//   const user_id = document._id;
//   await Prayer.deleteMany({ user: user_id });
//   await Testimony.deleteMany({ user: user_id });
// });

module.exports = Link;
