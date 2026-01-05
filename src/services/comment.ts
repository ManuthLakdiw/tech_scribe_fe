import api from "@/services/api";

export interface CommentType {
    _id: string;
    content: string;
    createdAt: string;
    author: {
        _id: string;
        fullname: string;
        username: string;
        profilePictureURL: string;
    };
    replies?: CommentType[];
    blog: string;
}

export const addComment = async (data: { content: string; blogId: string; parentCommentId?: string | null }) => {
    const response = await api.post("/comments/add", data);
    return response.data;
};

export const getCommentsByBlog = async (blogId: string) => {
    const response = await api.get(`/comments/${blogId}`);
    return response.data;
};

export const getAllCommentsAdmin = async () => {
    const response = await api.get("/comments/admin/all");
    return response.data;
};

export const toggleCommentStatus = async (id: string) => {
    const response = await api.patch(`/comments/admin/status/${id}`);
    return response.data;
};

