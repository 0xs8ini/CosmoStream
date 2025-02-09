import { ApiError } from "../utilities/apiErrorHandler.js";
import { ApiResponse } from "../utilities/apiResponseHandler.js";
import {
  isPasswdValid,
  isUserNameValid,
  isEmailValid,
} from "../utilities/validateUserRes.js";
import { User } from "../models/user.model.js";

const genAccessAndRefereshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.genAccessToken();
    const refershToken = user.genRefreshToken();

    user.refreshToken = refershToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refershToken };
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while generating tokens"));
  }
};

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
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json(new ApiError(400, "Email is required"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User Not Found"));
  }

  const isPasswdValidBoolean = await user.checkPassword(password);

  if (!isPasswdValidBoolean) {
    return res.status(401).json(new ApiError(401, "Invalid Credentials"));
  }

  const { accessToken, refershToken } = await genAccessAndRefereshToken(
    user._id
  );

  user.refreshToken = refershToken;
  user.password = "";

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refershToken, options)
    .json(
      new ApiResponse(200, "User Logged In Successfully", {
        user: user,
        accessToken,
        refershToken,
      })
    );
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Succesfully Loggedout", {}));
};

export { registerUser, loginUser, logoutUser };
