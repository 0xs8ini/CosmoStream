import { ApiError } from "../utilities/apiErrorHandler.js";
import { ApiResponse } from "../utilities/apiResponseHandler.js";
import {
  isPasswdValid,
  isUserNameValid,
  isEmailValid,
} from "../utilities/validateUserRes.js";
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    // Checking fields are given
    if (!email || !password || !userName) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "All fields (email, password, userName) are required"
          )
        );
    }

    // Check if email is valid
    if (!isEmailValid(email)) {
      return res.status(400).json(new ApiError(400, "Email is not valid"));
    }

    // Check if password is valid
    if (!isPasswdValid(password)) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Password must be at least 8 characters long, include 1 letter, 1 number, and 1 special character"
          )
        );
    }

    // Check if username is valid
    if (!isUserNameValid(userName)) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Username must be 3-16 characters long and contain only letters, numbers, or underscores."
          )
        );
    }

    // Check if a user with the same email or username already exists
    const doesUserExist = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (doesUserExist) {
      return res
        .status(409)
        .json(new ApiError(409, "User with email or username exists"));
    }

    // Create the user
    const user = await User.create({
      userName: userName.toLowerCase(),
      password,
      email,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res
        .status(500)
        .json(
          new ApiError(500, "Something went wrong while creating the user")
        );
    }

    return res.status(201).json(new ApiResponse(201, createdUser));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", err.message));
  }
};

const loginUser = async (req, res) => {
  // Your login implementation here.
};

const logoutUser = async (req, res) => {
  // Your logout implementation here.
};

export { registerUser, loginUser, logoutUser };
