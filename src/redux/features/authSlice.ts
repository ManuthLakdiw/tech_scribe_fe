import {storage} from "@/utils/StorageUtil.ts";
import {getMyDetails, login} from "@/services/auth";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export interface User {
    _id: string;
    id: string;
    fullname: string;
    username: string;
    email: string;
    profilePictureURL: string;
    roles: string[];
    createdAt: string;
    updatedAt: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isError: false,
    message: "",
};

interface LoginPayload {
    email: string;
    password: string;
    remember: boolean;
}


export const loginUser = createAsyncThunk(

    "auth/login",
    async (userData: LoginPayload, thunkAPI) => {
        try {
            const data = await login(userData.email, userData.password);
            console.log(data)


            if (data) {
                storage.setToken(
                    data.accessToken,
                    data.refreshToken,
                    userData.remember
                );
            }
            return data.user as User;
        } catch (error: any) {
            const message = error.response?.data?.message || "Login failed";
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const loadUser = createAsyncThunk(

    "auth/loadUser",
    async (_, thunkAPI) => {
        try {
            const token = storage.getToken();

            if (!token) {
                return thunkAPI.rejectWithValue("No token found");
            }

            const userData = await getMyDetails();
            return userData as User;

        } catch (error: any) {
            storage.clearToken();
            return thunkAPI.rejectWithValue("Session expired");
        }
    }
);


export const logout = createAsyncThunk("auth/logout", async () => {
    storage.clearToken();
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(loadUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload || null;
            })
            .addCase(loadUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;



