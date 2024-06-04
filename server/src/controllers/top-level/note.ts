import Express from "express";
import { retrieveBlogs, saveBlog,blog, appendContent, createAiText, generateImage } from "../../services/note.service";
import {v4 as uuidv4} from "uuid"
import fs from "fs"
import path from "path";

const imageDir = path.join(__dirname,"../../images");

export const createBlog = async(req:Express.Request,res:Express.Response) => {
    try {
        const blog = await saveBlog(req.body);
        return res.status(200).json({blog})        
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

export const getBlogs = async(req:Express.Request,res:Express.Response) => {
    try {
        const blogs = await retrieveBlogs();
        return res.status(200).json({blogs});
    } catch (error:any) {
        return res.status(500).json({error:error.message});
    }
}

export const getBlog = async(req:Express.Request,res:Express.Response) => {
    try {
        const data = await blog(req.body.id);
        return res.status(200).json({data});
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

export const addContent = async(req:Express.Request,res:Express.Response) => {
    try {
        const blog = await appendContent(req.body.blogId,req.body.content);
        return res.status(200).json({blog});
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}

export const completeText = async(req:Express.Request,res:Express.Response) => {
    try {
        const text = await createAiText(req.body.prompt);
        return res.status(200).json({text})
    } catch (error:any) {
        console.log({error})
        return res.status(500).json({error:error.message});
    }
}

export const createImage = async(req:Express.Request,res:Express.Response) => {
    try {
        const imageBuffer = await generateImage(req.body.prompt);
        const imageName = `${uuidv4()}.jpeg`;
        const imagePath = path.join(imageDir, imageName);

        fs.writeFileSync(imagePath, imageBuffer);
        const imageUrl = `http://localhost:3000/images/${imageName}`;
        return res.status(200).json({ image: imageUrl });
    } catch (error:any) {
        return res.status(500).json({error:error.message})
    }
}