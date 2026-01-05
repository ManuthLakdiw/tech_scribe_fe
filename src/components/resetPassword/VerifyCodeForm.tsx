import { ArrowRight, KeyRound, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import {toast} from "sonner";
import {forgotPassword} from "@/services/auth.ts";
import {handleApiError} from "@/utils/handleApiErrorUtil.ts";

const VerifyCodeForm = ({ onNext, onBack, code, setCode, onResend, isBtnDisabled, email}: any) => {

    const [timeLeft, setTimeLeft] = useState(120);


    const canResend = timeLeft === 0;

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleResendClick =  async () => {
        if (canResend) {
            onResend();
            setTimeLeft(120);
        }

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

        }catch (error: any) {
            console.error("Error sending reset code:", error);
            handleApiError(error, toastId, "Registration failed!");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setCode(value);
        }
    };

    return (
        <div className="space-y-4">
            <form className="space-y-4" onSubmit={onNext}>
                <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium">
                        <KeyRound strokeWidth={2} size={16} />
                    </div>
                    <input
                        required={true}
                        value={code}
                        onChange={handleInputChange}
                        type="text"
                        maxLength={6}
                        placeholder="Enter 6-digit code"
                        className="font-mono text-center w-full tracking-widest text-sm border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs"
                    />
                </div>
                <div className="flex gap-3">
                    <button
                        disabled={isBtnDisabled}
                        type="button"
                        onClick={onBack}
                        className={"text-sm flex-1 text-dark-secondary dark:text-light-secondary border border-neutral-soft dark-border " +
                            "bg-light-secondary dark:bg-overlay-light hover:bg-neutral-soft/5 dark:hover:bg-white/8 rounded-md cursor-pointer py-2 " +
                            "flex items-center justify-center gap-2"}
                    >
                        Back
                    </button>
                    <button
                        disabled={isBtnDisabled}
                        type="submit"
                        className="flex-1 text-light-secondary dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 rounded-md py-2 text-sm flex items-center justify-center gap-2"
                    >
                        Verify <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </form>

            <div className="text-center">
                {!canResend ? (
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                        Resend code in <span className="font-mono font-medium text-indigo-500">{formatTime(timeLeft)}</span>
                    </p>
                ) : (
                    <button
                        disabled={isBtnDisabled}
                        type="button"
                        onClick={handleResendClick}
                        className="text-xs flex items-center justify-center gap-1.5 mx-auto text-indigo-500 hover:text-indigo-600 hover:underline transition-all cursor-pointer"
                    >
                        <RefreshCw className="w-3 h-3" />
                        Resend Code
                    </button>
                )}
            </div>
        </div>
    );
};

export default VerifyCodeForm;