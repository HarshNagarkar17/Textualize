import bcrypt from "bcrypt";
import { userModel } from "../models/user.model";

export const registerUser = async (data: any) => {
  const { email, password } = data;

  const userExist = await userModel.findOne({email}); 

  if (userExist) throw new Error("user already exist");

  const hashedPassword = await bcrypt.hash(password, 8);
 
  return userModel.create({email,password:hashedPassword});
};

export const validateUser = async (data: any) => {
  const { email, password } = data;

  const user = await userModel.findOne({email});

  if (!user) throw new Error("email does not exist");

  if (!(await bcrypt.compare(password, user.password)))
    throw new Error("Invalid password");

  return user;
};
