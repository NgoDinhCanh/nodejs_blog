const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    username: String,
    password: String,
  },
  { collection: "user" }
);
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
