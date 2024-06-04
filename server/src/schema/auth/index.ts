import Joi, { Schema } from "joi";

export const authSchema = Joi.object({
  email: Joi.string().min(3).max(30).required().messages({
    "string.base": "Email should be a type of text",
    "string.empty": "Email cannot be empty",
    "string.min": "Email should have a minimum length of 3",
    "string.max": "Email should have a maximum length of 30",
    "any.required": "Email is a required field",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-30 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      "string.empty": "Password cannot be empty",
      "string.min": "Password should have a minimum length of 8",
      "string.max": "Password should have a maximum length of 30",
      "any.required": "Password is a required field",
    }),
});



