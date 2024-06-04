import { Schema } from "joi";
import { schemas } from "../../schema";

const fetchSchema = (schemaName: string): Schema => {
  return schemas[schemaName];
};

export const validator = (schemaName: string, body: any) => {
  const schema: Schema = fetchSchema(schemaName);

  if (!schema) {
    return { error: "Schema not found" };
  }

  const { value, error } = schema.validate(body, { abortEarly: false });
  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return { error: errorDetails };
  }

  return { value };
};
