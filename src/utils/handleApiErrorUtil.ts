import { toast } from "sonner";

export const handleApiError = (error: any, toastId: string | number, defaultMessage: string = "Something went wrong") => {

    let errorMessage = defaultMessage;
    let description = "Please check your inputs and try again.";

    if (error.response) {
        errorMessage = error.response?.data?.message || error.response?.data?.error || defaultMessage;
        if (error.response.status === 401 || error.response.status === 403) {
            description = "Invalid credentials. Please check your email and password.";
        } else if (error.response.status === 404) {
            description = error.response.message || "Requested resource not found.";
        } else if (error.response.status >= 500) {
            description = "Server error. Please try again later.";
        } else {
            description = "Please check your details and try again.";
        }
    }

    else if (error.request || error.code === "ERR_NETWORK" || error.message === "Network Error") {
        errorMessage = "Connection Failed";
        if (!navigator.onLine) {
            description = "No internet connection. Please check your network.";
        } else {
            description = "Server is unreachable. Is the server running?";
        }
    }

    else if (typeof error === "string") {
        errorMessage = error;
    }

    else {
        errorMessage = error.message || defaultMessage;
    }

    toast.error(errorMessage, {
        id: toastId,
        description: description,
        duration: 4000,
    });
};