import { User } from "../models/user.model.js";

export const isEmailValid = (email) => {
  if (!email || email.trim() === "") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPasswdValid = (passwd) => {
  if (!passwd || passwd.trim() === "") return false;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwd.length >= 8 && passwordRegex.test(passwd);
};

export const isUserNameValid = (userName) => {
  if (!userName || userName.trim() === "") return false;
  const userNameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  return userNameRegex.test(userName);
};