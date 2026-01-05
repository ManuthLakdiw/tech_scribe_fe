import api from './api';


export interface AuthorRequestData {
    _id: string;
    user: {
        _id: string;
        fullname: string;
        username: string;
        email: string;
        profilePictureURL: string;
    };
    email: string;
    phoneNumber: string;
    qualifications: string;
    reason: string;
    portfolioUrl: string;
    sampleWriting: string;
    documentUrl: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
}



export const register = async (data:FormData) => {
    const response =  await api.post('/auth/register', data);
    return response.data;
}

export const login = async (email:string, password:string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
}

export const getMyDetails = async () => {
    const response = await api.get("/auth/me")
    return response.data;
}

export const forgotPassword = async (email:string) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
}

export const verifyOtp = async (email:string, code:string) => {
    const response = await api.post("/auth/verify-otp", { email ,code });
    return response.data;
}

export const resetPassword = async (email:string, password:string, code:string) => {
    const response = await api.put("/auth/reset-password", { email ,newPassword: password ,code });
    return response.data;
}

export const refreshToken = async (token:string) => {
    const response = await api.post("/auth/refresh-token", { token });
    return response.data;
}

export const getAllUsers = async () => {
    const response = await api.get("/auth/users/all");
    return response.data;
};

export const toggleUserStatus = async (userId: string) => {
    const response = await api.patch(`/auth/users/status/${userId}`);
    return response.data;
};

export const submitAuthorRequest = async (formData: FormData) => {
    const response = await api.post("/auth/request-author", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const getMyAuthorRequestStatus = async () => {
    const response = await api.get("/auth/become-author/status");
    return response.data;
};


export const getAuthorRequests = async () => {
    const response = await api.get("/auth/author-requests/all");
    return response.data;
};

export const updateAuthorRequestStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    const response = await api.patch(`/auth/author-requests/status/${id}`, { status });
    return response.data;
};
