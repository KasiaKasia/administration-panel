const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: String,
    password:  String,
    description: { type: String, required: false },
    email:  String,
    type:  String,
    address: {
      street: String,
      houseNumber: String,
      city: String
    }
});

UserSchema.pre('save', function (next) {
  const users = this,
    SALT_FACTOR = 5;
  if (!users.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(users.password, salt, null, (err, hash) => {
      if (err) return next(err);
      users.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
 // compare - load hash from your password DB.
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('users', UserSchema, 'users');
