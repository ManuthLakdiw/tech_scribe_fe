const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export const storage = {
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    },

    getRefreshToken: () => {
        return localStorage.getItem(REFRESH_KEY) || sessionStorage.getItem(REFRESH_KEY);
    },

    setToken: (token: string, refreshToken: string, remember: boolean) => {
        if (remember) {
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem(REFRESH_KEY, refreshToken);

            sessionStorage.removeItem(TOKEN_KEY);
            sessionStorage.removeItem(REFRESH_KEY);
        } else {
            sessionStorage.setItem(TOKEN_KEY, token);
            sessionStorage.setItem(REFRESH_KEY, refreshToken);

            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(REFRESH_KEY);
        }
    },

    clearToken: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(REFRESH_KEY);
    }
};