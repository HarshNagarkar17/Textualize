import express from "express";
import { addContent, completeText, createBlog, createImage, getBlog, getBlogs } from "../controllers/top-level/note";

const apiRouter = express();

apiRouter.post("/createBlog",createBlog)
apiRouter.get("/getBlogs",getBlogs);
apiRouter.post("/blog",getBlog)
apiRouter.post("/saveBlog",addContent)
apiRouter.post("/completion",completeText);
apiRouter.post("/generateImage", createImage);

export default apiRouter;