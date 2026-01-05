import { AnimatePresence, motion } from "framer-motion";
import {AlertCircle, House, Moon, Sun} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme.ts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { useState } from "react";
import RequestResetForm from "@/components/resetPassword/RequestResetForm.tsx";
import VerifyCodeForm from "@/components/resetPassword/VerifyCodeForm.tsx";
import NewPasswordForm from "@/components/resetPassword/NewPasswordForm.tsx";
import {forgotPassword, resetPassword, verifyOtp} from "@/services/auth.ts";
import {toast} from "sonner";
import {handleApiError} from "@/utils/handleApiErrorUtil.ts";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [isSendRestCodeBtnDisabled, setIsSendRestCodeBtnDisabled] = useState(false);
    const [isVerifyCodeBtnDisabled, setIsVerifyCodeBtnDisabled] = useState(false);
    const [isResetBtnDisabled, setIsResetBtnDisabled] = useState(false);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        setIsSendRestCodeBtnDisabled(true);
        e.preventDefault();
        setError("");

        const toastId = toast.loading("Sending reset code...", {
            description: "Please check your email for the reset code."
        });

        try {
            const result = await  forgotPassword(email);
            toast.success(result.message || "Email sent successfully!", {
                id: toastId,
                description: "Verify your email to reset your password.",
                duration: 3000,
            });
            setStep(2);

        }catch (error: any) {
            console.error("Error sending reset code:", error);
            handleApiError(error, toastId, "Registration failed!");
        }finally {
            setIsSendRestCodeBtnDisabled(false);
        }

        console.log("Sending code to", email);

    };

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsVerifyCodeBtnDisabled(true);
        if (code.length !== 6) {
            setError("Invalid code. Code must be 6 digits.")
            setIsVerifyCodeBtnDisabled(false);
            return;
        };

        const toastId = toast.loading("Verifying reset code...", {
            description: "Please wait while we verify your code."
        });

        try {
            const result = await verifyOtp(email, code);
            toast.success(result.message || "Code verified successfully!", {
                id: toastId,
                duration: 3000,
            });
            setStep(3);
        }catch (error: any) {
            console.error("Error verifying code:", error);
            handleApiError(error, toastId, "Verification failed!");
        }finally {
            setIsVerifyCodeBtnDisabled(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        console.log(password,email,code)
        e.preventDefault();
        setError("");
        setIsResetBtnDisabled(true);
        if (password.length < 8) {
            setError("Password must be at least 8 characters.")
            setIsResetBtnDisabled(false);
            return;
        };
        const toastId = toast.loading("Resetting password...", {
            description: "Please wait while we reset your password."
        });

        try {
            const result  = await  resetPassword(email,password,code);
            console.log(result)
            toast.success(result.message || "Password reset successfully!", {
                id: toastId,
                description: "You can now sign in with your new password.",
                duration: 3000,
            });
            navigate("/login");
        }catch (error: any) {
            console.error("Error resetting password:", error);
            handleApiError(error, toastId, "Password reset failed!");

        }finally {
            setIsResetBtnDisabled(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-light-primary dark:bg-dark-primary theme-transition">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={"fixed top-4 left-4 right-4 z-50 flex justify-between items-center theme-transition"}
            >
                <div onClick={() => navigate("/")} className={"flex items-center gap-2 px-4 py-2 rounded-full bg-light-primary dark:bg-dark-primary text-dark-primary dark:text-light-secondary backdrop-blur-lg border border-neutral-soft dark-border transition-all cursor-pointer hover:scale-105 active:scale-95"}>
                    <House className={"w-4 h-4"} />
                    <span className={"text-sm font-medium hidden sm:inline"}>Back to Home</span>
                </div>
                <div onClick={toggleTheme} className={"w-10 h-10 rounded-full bg-light-primary dark:bg-overlay-light text-dark-primary dark:text-light-secondary backdrop-blur-lg shadow-lg border border-neutral-soft dark-border inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all cursor-pointer hover:scale-110 active:scale-90"}>
                    <AnimatePresence mode="wait" initial={false}>
                        {theme === "dark" ? (
                            <motion.div key="moon" initial={{ opacity: 0, rotate: -90, scale: 0 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                                <Moon strokeWidth={2} size={17} />
                            </motion.div>
                        ) : (
                            <motion.div key="sun" initial={{ opacity: 0, rotate: -90, scale: 0 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                                <Sun strokeWidth={2} size={17} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-8 w-fit mx-auto">Tech Scribe</h1>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
                        <p className="text-muted-foreground">
                            {step === 1 && "Enter your email to receive a reset code"}
                            {step === 2 && "Enter the 6-digit code sent to your email"}
                            {step === 3 && "Create your new password"}
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-8">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                                        step > s
                                            ? "bg-green-500 text-white"   
                                            : step === s
                                                ? "bg-indigo-500 text-white"  
                                                : "bg-muted text-muted-foreground" 
                                    }`}
                                >
                                    {s}
                                </div>

                                {s < 3 && (
                                    <div
                                        className={`w-12 h-1 transition-colors ${
                                            step > s ? "bg-green-500" : "bg-muted" 
                                        }`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="bg-light-secondary dark:bg-dark-secondary/40 text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                        <div className="p-6">
                            {/* Error Alert */}
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        key={error}
                                        initial={{ opacity: 0, y: -10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: "auto" }}
                                        exit={{ opacity: 0, y: -10, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="mb-4"
                                    >
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    layout
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {step === 1 && (
                                        <RequestResetForm
                                            onNext={handleEmailSubmit}
                                            isBtnDisabled={isSendRestCodeBtnDisabled}
                                            email={email}
                                            setEmail={setEmail}
                                        />
                                    )}
                                    {step === 2 && (
                                        <VerifyCodeForm
                                            onNext={handleCodeSubmit}
                                            onBack={() => (setStep(1), setError(""), setCode(""))}
                                            isBtnDisabled={isVerifyCodeBtnDisabled}
                                            email={email}
                                            code={code}
                                            setCode={setCode}
                                            onResend={() => setError("")}
                                        />
                                    )}
                                    {step === 3 && (
                                        <NewPasswordForm
                                            onSubmit={handlePasswordSubmit}
                                            isBtnDisabled={isResetBtnDisabled}
                                            password={password}
                                            setPassword={setPassword}
                                            error={error}
                                            setError={setError}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <p className="text-center text-neutral-strong dark:text-neutral-medium mt-6 text-sm sm:text-base">
                        Remember your password? <span onClick={() => navigate("/login")} className="text-indigo-500 hover:underline cursor-pointer">Sign in</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;