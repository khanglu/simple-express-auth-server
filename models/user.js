const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// On save hook, encrypt password
// Before saving a model, run this function
userSchema.pre("save", function(next) {
  // get access to the user model
  const user = this; // user.email, user.password
  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    // hash (encrypt) our password using the sale
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const ModelClass = mongoose.model("user", userSchema);

// Export the model
module.exports = ModelClass;
