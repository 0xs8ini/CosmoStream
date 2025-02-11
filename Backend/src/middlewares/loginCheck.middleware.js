import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";
import { ApiError } from "../utilities/apiErrorHandler.js";

const loginCheck = async (req, res, next) => {
  try {
    const token = req.cookies["accessToken"];

    if (!token) {
      return res
        .status(401)
        .json(new ApiError(401, "Unauthorized User- Token Not Provided"));
    }

    const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN_SEC_KEY);

    if (!decodedToken) {
      return res
        .status(401)
        .json(new ApiError(401, "Unauthorized User - Token Invalid"));
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found "));
    }

    req.user = user;
  } catch (error) {
    console.log("Error in logic check middle ware", error.message);
    res
      .status(500)
      .json(new ApiError(500, "Something Went wrong while logging check "));
  }
  next();
};

export default loginCheck;
