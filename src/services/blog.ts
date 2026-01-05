import api from './api';

export const createBlog = async (data:any) => {
    const response = await api.post("/blogs/create", data);
    return response.data;
}

export  const updateBlog = async (id:string, data:any) => {
    const response = await api.put(`/blogs/update/${id}`, data);
    return response.data;
}

export const deleteBlog = async (id: string) => {
    const response = await api.delete(`/blogs/delete/${id}`);
    return response.data;
};

export const getPublishedBlogs = async () => {
    const response = await api.get("/blogs/published");
    return response.data;
}

export const getDraftBlogs = async () => {
    const response = await api.get("/blogs/drafts");
    return response.data;
};

export const getBlogBySlug = async (slug: string) => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
};

export const getAllPostsAdmin = async () => {
    const response = await api.get("/blogs/admin/all");
    return response.data;
};

export const togglePostStatus = async (id: string, type: 'featured' | 'blocked') => {
    const response = await api.patch(`/blogs/admin/status/${id}`, { type });
    return response.data;
};

export const getAllBlogs = async (page = 1, limit = 9, search = "", category = "", sort = "") => {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        category: category === "All Articles" ? "" : category,
        sort: sort === "Latest" ? "latest" : sort === "Most Viewed" ? "views" : "latest"
    });

    const response = await api.get(`/blogs/all?${params.toString()}`);
    return response.data;
};

export const getCategoryCounts = async () => {
    const response = await api.get("/blogs/categories/counts");
    return response.data;
};

export const getBlogsByCategory = async (categorySlug: string, page = 1, limit = 9) => {
    const response = await api.get(`/blogs/category/${categorySlug}?page=${page}&limit=${limit}`);
    return response.data;
};
