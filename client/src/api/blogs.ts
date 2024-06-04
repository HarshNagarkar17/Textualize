import axiosInstance from "@/utils/axios"
import { AxiosResponse } from "axios";

const blogService = {
    getBlogs: async() => {
        const response: AxiosResponse = await axiosInstance.get("api/getBlogs");
        return response.data; 
    },
    
    getSingleBlog: async(id: string) => {
        const response: AxiosResponse = await axiosInstance.post("/api/blog", { id });
        return response.data.data;
    },

    saveBlog: async(blogId: string, content: string) => {
        const response = await axiosInstance.post("/api/saveBlog", {
            blogId,
            content
        });

        return response.data;
    } 
}

export default blogService;