import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jw from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    searchHistory: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 15);
  }
  next();
});

userSchema.methods.checkPassword = async function (passwd) {
  return await bcrypt.compare(passwd, this.password);
};

userSchema.methods.genAccessToken = function () {
  return jw.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SEC_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME,
    }
  );
};

userSchema.methods.genRefreshToken = function () {
  return jw.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SEC_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME,
    }
  );
};

export const User = mongoose.model("User", userSchema);
