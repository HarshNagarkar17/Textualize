import { Schema } from "joi";
import { authSchema } from "./auth";

export const schemas: { [key: string]: Schema } = {
    auth: authSchema,
  };