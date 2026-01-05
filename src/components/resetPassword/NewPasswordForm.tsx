import { Eye, EyeOff, ArrowRight, LockKeyhole, Check } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ResponsiveGrid from "@/components/ResponsiveGrid.tsx";

interface NewPasswordFormProps {
    onSubmit: (e: React.FormEvent) => void;
    password: string;
    setPassword: (value: string) => void;
    error: string;
    setError: (value: string) => void;
    isBtnDisabled?: boolean;
}

const NewPasswordForm = ({ onSubmit, password, setPassword, error, setError, isBtnDisabled}: NewPasswordFormProps) => {

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordTyping, setIsPasswordTyping] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const passwordCriteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (error) setError("");

        if (name === "password") {
            setPassword(value);
            setIsPasswordTyping(value.length > 0);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const handleLocalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!passwordCriteria.length) return setError("Password must be at least 8 characters long.");
        if (!passwordCriteria.uppercase) return setError("Password must contain at least 1 uppercase letter.");
        if (!passwordCriteria.lowercase) return setError("Password must contain at least 1 lowercase letter.");
        if (!passwordCriteria.number) return setError("Password must contain at least 1 number.");

        if (password !== confirmPassword) return setError("Passwords do not match! Please try again.");

        onSubmit(e);
    };

    return (
        <form className="space-y-4" onSubmit={handleLocalSubmit}>
            <div className="space-y-2">
                <motion.div className={"flex flex-col gap-2 mb-4"}>
                    <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Password</label>
                    <div className={"relative flex-1"}>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><LockKeyhole strokeWidth={2} size={16} /></div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-strong dark:text-neutral-medium cursor-pointer">
                            {isPasswordVisible ?
                                <EyeOff onClick={() => setIsPasswordVisible(false)} strokeWidth={2} size={16} /> :
                                <Eye onClick={() => setIsPasswordVisible(true)} strokeWidth={2} size={16} />
                            }
                        </div>
                        <input
                            required
                            name="password"
                            value={password}
                            onChange={handleChange}
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder={".............."}
                            autoComplete="new-password"
                            className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-8 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs"
                        />
                    </div>

                    <AnimatePresence>
                        {isPasswordTyping &&
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                transition={{ duration: 0.3, ease: "linear" }}
                                className={"mt-2 overflow-hidden"}
                            >
                                <ResponsiveGrid defCols={1} smCols={2} gap={2}>
                                    <div className={`text-xs flex items-center gap-1 transition-colors ${passwordCriteria.length ? "text-green-500" : "text-muted-foreground"}`}>
                                        <Check className={`w-3 h-3 ${passwordCriteria.length ? "opacity-100 text-green-500" : "opacity-30"}`} />
                                        At least 8 characters
                                    </div>
                                    <div className={`text-xs flex items-center gap-1 transition-colors ${passwordCriteria.uppercase ? "text-green-500" : "text-muted-foreground"}`}>
                                        <Check className={`w-3 h-3 ${passwordCriteria.uppercase ? "opacity-100 text-green-500" : "opacity-30"}`} />
                                        One Uppercase Letter
                                    </div>
                                    <div className={`text-xs flex items-center gap-1 transition-colors ${passwordCriteria.lowercase ? "text-green-500" : "text-muted-foreground"}`}>
                                        <Check className={`w-3 h-3 ${passwordCriteria.lowercase ? "opacity-100 text-green-500" : "opacity-30"}`} />
                                        One Lowercase Letter
                                    </div>
                                    <div className={`text-xs flex items-center gap-1 transition-colors ${passwordCriteria.number ? "text-green-500" : "text-muted-foreground"}`}>
                                        <Check className={`w-3 h-3 ${passwordCriteria.number ? "opacity-100 text-green-500" : "opacity-30"}`} />
                                        One number
                                    </div>
                                </ResponsiveGrid>
                            </motion.div>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>

            <div className="space-y-2">
                <div className={"flex flex-col gap-2 mb-4"}>
                    <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Confirm Password</label>
                    <div className={"relative flex-1"}>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><LockKeyhole strokeWidth={2} size={16} /></div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-strong dark:text-neutral-medium cursor-pointer">
                            {isConfirmPasswordVisible ?
                                <EyeOff onClick={() => setIsConfirmPasswordVisible(false)} strokeWidth={2} size={16} /> :
                                <Eye onClick={() => setIsConfirmPasswordVisible(true)} strokeWidth={2} size={16} />
                            }
                        </div>
                        <input
                            required
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            placeholder={".............."}
                            className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-8 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs"
                        />
                    </div>
                </div>
            </div>

            <button
                disabled={isBtnDisabled}
                type="submit"
                className="text-light-secondary dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 rounded-md cursor-pointer w-full py-2 md:py-2.5 flex items-center justify-center gap-4 shadow-md"
            >
                <p className="text-sm">Reset Password</p>
                <ArrowRight className="w-4 h-4" />
            </button>
        </form>
    );
};

export default NewPasswordForm;