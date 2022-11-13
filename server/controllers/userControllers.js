import users from "../model/userModel.js";
import { isValidate, sendMail } from "../utils/utils.js";
import bcrypt from "bcryptjs";

export const signupController = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  try {
    if (email) {
      if (!isValidate(email)) {
        return res.status(404).send({ email: "invalid email" });
      }
      const existingUser = await users.findOne({ email: email });
      if (existingUser) {
        return res.status(404).send({ email: "user already exist" });
      }
    }

    if (password.length < 8) {
      return res
        .status(404)
        .send({ password: "password must contain altleast 8 characters" });
    }
    if (password !== confirmPassword) {
      return res.status(404).send({ confirmPassword: "passwords don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await users.create({
      name: `${firstname} ${lastname}`,
      email: email,
      password: hashedPassword,
    });

    const token = await newUser.generateToken();
    await newUser.save();
    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const verifiedUser = await users.findOne({ email: email });

    if (!verifiedUser) {
      return res.status(404).send({ email: "user not found" });
    }

    const isPasswordVerified = await bcrypt.compare(
      password,
      verifiedUser.password
    );

    if (!isPasswordVerified) {
      return res.status(404).send({ password: "invalid credentials" });
    }

    const token = await verifiedUser.generateToken();

    res.status(200).send({ result: verifiedUser, token });
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
};

export const logoutController = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send("successfully logged out");
  } catch (error) {
    res.status(501).send({ error: error.message });
  }
};

export const forgotPasswordLinkController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await users.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .send({ message: "user with given email doesn't exist" });
    }

    const url = `${process.env.BASE_URL}password-reset/${user._id}`;
    const error = await sendMail(user.email, "Password-Reset", url);

    if (error) {
      return res.status(400).send({ message: "email not sent" });
    }

    res
      .status(200)
      .send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ error: "internal server error" });
  }
};

export const forgotPasswordResetController = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  try {
    const user = await users.findOne({ _id: id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const hashPassword = await bcrypt.hash(password, 12);
    user.password = hashPassword;
    await user.save();

    res.status(200).send({ message: "password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};
