import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.jwtkey
  );
  user.tokens = user.tokens.concat({ token: token });
  await user.save();
  return token;
};

const users = mongoose.model("TrackerUser", userSchema);

export default users;
