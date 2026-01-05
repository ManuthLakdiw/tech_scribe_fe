import api from "@/services/api.ts";

export const generateBlogContent = async (category: string, title?: string) => {
    const response = await api.post("/ai/generate", {
        text: title,
        category: category
    });
    return response.data;
};