import mongoose from "mongoose";
import { blogModel } from "../models/blog.model";
import axios from "axios";
import { config } from "../config/config";

export const saveBlog = async (data: { name: string }) => {
  const { name } = data;

  return blogModel.create({ name });
};

export const retrieveBlogs = async () => {
  return blogModel.find();
};

export const blog = async (id: mongoose.Types.ObjectId) => {
  return blogModel.findById(id);
};

export const appendContent = async (
  blogId: mongoose.Types.ObjectId,
  content: string
) => {
  return blogModel.findByIdAndUpdate(
    blogId,
    { $set: { content } },
    { new: true }
  );
};

export const createAiText = async (prompt: string) => {
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/openai-community/gpt2",
    { inputs: prompt },
    {
      headers: {
        Authorization: `Bearer ${config.MODEL_API}`,
      },
    }
  );

  return response.data;
};

export const generateImage = async(prompt: string) => {
  console.log({prompt});
  const response = await fetch(

    "https://api-inference.huggingface.co/models/Corcelio/mobius",
    {
      headers: { Authorization: `Bearer ${config.MODEL_API}` },
      method: "POST",
      body: JSON.stringify(prompt),
    }
  );
  const imageBlob = await response.blob();
  console.log({imageBlob});
  const imageBuffer = await imageBlob.arrayBuffer();
  console.log({imageBuffer})
  return Buffer.from(imageBuffer);
}

