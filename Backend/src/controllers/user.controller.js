import ApiError from "../utilities/apiErrorHandler.js";
import ApiResponse from "../utilities/apiResponseHandler.js";
import {
  isPasswdValid,
  isUserNameValid,
  isEmailValid,
  doesUserExist,
} from "../utilities/validateUserRes.js";
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  const { email, password, userName } = req.body;

  // Checking fields are not not empty
  if (
    [email, password, userName].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //   Checking email is valid
  if (!isEmailValid(email)) {
    throw new ApiError(400, "Email is not valid");
  }

  //   Checking password is valid
  if (!isPasswdValid(password)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters long, include 1 letter, 1 number, and 1 special character"
    );
  }

  //   Checking userName is valid
  if (!isUserNameValid(userName)) {
    throw new ApiError(
      400,
      "Username must be 3-16 characters long and contain only letters, numbers, or underscores."
    );
  }

  // Checking does user Exist
  if (doesUserExist) {
    throw new ApiError(409, "User with email or userName exits");
  }

  const user = await User.create({
    username: userName.toLowerCase(),
    password,
    email,
  });

  const createdUser = await User.findById(user._id).select(
    "-password",
    "-refreshToken"
  ); // Select is used to reomve the filed you dont want

  if (!createdUser) {
    throw new ApiError(500, "Something Went wrong while creating the user");
  }

  return res.status(201).json(new ApiResponse(200, createdUser));
};

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

export { registerUser, loginUser, logoutUser };
