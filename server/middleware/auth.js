import jwt from "jsonwebtoken";
import users from "../model/userModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.jwtkey);
    req.user = await users.findOne({
      _id: decodedData.id,
      "tokens.token": token,
    });
    req.userId = decodedData.id;
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
