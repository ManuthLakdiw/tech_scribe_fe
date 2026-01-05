import ResponsiveGrid from "../ResponsiveGrid.tsx";
import {
    ArrowRight,
    AtSign,
    Camera,
    Eye,
    EyeOff,
    House,
    LockKeyhole,
    Mail,
    Moon,
    Sun, Trash2,
    Upload,
    User,
    CodeXml,
    Users,
    Sparkles,
    Zap, AlertCircle, Check
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme.ts";
import {AnimatePresence, motion, type Variants} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {register} from "../../services/auth.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {toast} from "sonner";
import {handleApiError} from "@/utils/handleApiErrorUtil.ts";


const avatarColors = [
    { gradient: 'from-indigo-500 to-purple-600', ring: 'ring-indigo-500' },
    { gradient: 'from-pink-500 to-rose-600', ring: 'ring-pink-500' },
    { gradient: 'from-emerald-500 to-teal-600', ring: 'ring-emerald-500' },
    { gradient: 'from-orange-500 to-amber-600', ring: 'ring-orange-500' },
    { gradient: 'from-cyan-500 to-blue-600', ring: 'ring-cyan-500' },
    { gradient: 'from-violet-500 to-fuchsia-600', ring: 'ring-violet-500' },
];



const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3 }
    }
};


const itemVariants: Variants = {
    hidden: {
        y: 20,
        opacity: 0,
        filter: "blur(5px)"
    },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const items = [
    { icon: <CodeXml className={"w-6 h-6 text-light-secondary"} />, content: "Access to all articles and tutorials" },
    { icon: <Users className={"w-6 h-6 text-light-secondary"} />, content: "Join a community of developers" },
    { icon: <Sparkles className={"w-6 h-6 text-light-secondary"} />, content: "AI-powered writing assistance" },
    { icon: <Zap className={"w-6 h-6 text-light-secondary"} />, content: "Track your learning progress" },
];



const RegisterPage = () => {

    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>(avatarColors[0].gradient);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isPasswordTyping, setIsPasswordTyping] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % items.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);


    const passwordCriteria = {
        length: formData.password.length >= 8,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "password") {
            setIsPasswordTyping(value.length > 0);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemovePhoto = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!passwordCriteria.length) return setError("Password must be at least 8 characters long.");
        if (!passwordCriteria.uppercase) return setError("Password must contain at least 1 uppercase letter.");
        if (!passwordCriteria.lowercase) return setError("Password must contain at least 1 lowercase letter.");
        if (!passwordCriteria.number) return setError("Password must contain at least 1 number.");
        if (formData.password !== formData.confirmPassword) return setError("Passwords do not match! Please try again.");

        setIsLoading(true);

        const toastId = toast.loading("Creating your account...", {
            description: "Please wait while we set things up."
        });

        try {
            const data = new FormData();
            data.append("fullname", formData.fullname);
            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);
            if (selectedFile) {
                data.append("image", selectedFile);
            }
            data.append("color", selectedColor);
            const result = await register(data);
            toast.success(result.message || "Account created successfully!", {
                id: toastId,
                description: "Welcome to TechScribe!",
                duration: 3000,
            });
            navigate("/login");
            console.log(result);

        } catch (error: any) {
            console.error(error);
            handleApiError(error, toastId, "Registration failed!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={"w-full min-h-screen"}>
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
            <ResponsiveGrid defCols={1} lgCols={2} className={"h-full"} gap={0}>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={"w-full sticky top-0 h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hidden lg:flex flex-col items-center justify-center relative"}
                >

                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
                        <motion.div
                            className={"absolute top-24 right-24 z-20"}

                            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: -90 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <motion.div
                                className={"w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl z-10"}
                                animate={{
                                    y: [0, -25, 0],
                                    rotate: [-90, -105, -90]
                                }}

                                transition={{
                                    duration: 6,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "loop"
                                }}
                            />
                        </motion.div>
                        <motion.div
                            className={"absolute bottom-26 left-24"}

                            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: -90 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <motion.div
                                className={"w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-2xl"}
                                animate={{
                                    x: [0, -25, 0],
                                    rotate: [-90, -105, -90]
                                }}

                                transition={{
                                    duration: 6,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "loop"
                                }}
                            />
                        </motion.div>
                        <motion.h1 variants={itemVariants} className={"z-20 text-4xl font-bold text-light-secondary mb-4 text-center"}>Start Your Journey today</motion.h1>
                        <motion.p variants={itemVariants} className={"z-20 text-light-secondary/80 text-lg mb-10 text-center"}>Create an account to start reading, writing, <br/>and connecting with the developer community.</motion.p>

                        <motion.div variants={itemVariants} className="w-full">
                            {items.map((item, index) => {
                                const isActive = activeIndex === index;
                                return (
                                    <motion.div
                                        key={index}
                                        animate={{
                                            scale: isActive ? 1.05 : 1,
                                            backgroundColor: isActive ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.1)",
                                            borderColor: isActive ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.2)"
                                        }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className={"z-20 relative flex items-center gap-4 p-4 rounded-2xl backdrop-blur-sm border mb-4 cursor-default overflow-hidden"}
                                    >
                                        <div className={"w-12 h-12 rounded-xl flex items-center justify-center bg-light-secondary/30 transition-colors"}>{item.icon}</div>
                                        <span className={"text-light-secondary font-medium text-left"}>{item.content}</span>
                                        {isActive && (
                                            <motion.div layoutId="active-dot" className="absolute  right-4 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </motion.div>

                <div className={"w-full min-h-screen bg-light-primary dark:bg-dark-primary flex-1 flex items-center justify-center p-4 sm:p-8 pt-20 overflow-y-auto"}>
                    <motion.div
                        className={"w-full max-w-md"}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.h1 variants={itemVariants} className={"font-bold text-2xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end w-fit bg-clip-text text-transparent mb-6 md:mb-8"}>TechScribe</motion.h1>
                        <motion.h2 variants={itemVariants} className={"text-2xl md:text-3xl font-bold mb-2 text-dark-secondary dark:text-light-secondary"}>Create Your Account</motion.h2>
                        <motion.h3 variants={itemVariants} className={"mb-6 md:mb-8 text-neutral-strong dark:text-neutral-medium"}>Join or community of developers</motion.h3>

                        <motion.div
                            variants={itemVariants}
                            className={"w-full min-h-[556px] bg-light-secondary dark:bg-dark-secondary/40 shadow-xl rounded-xl border border-neutral-soft dark-border py-6"}
                        >
                            <div className={"p-4 md:p-6 w-full h-full"}>
                                <motion.div variants={itemVariants} className={"flex flex-col items-center mb-5"}>
                                    <div
                                        className={`relative flex shrink-0 overflow-hidden rounded-full w-20 h-20 md:w-24 md:h-24 ring-4 ring-dark-secondary/5 dark:ring-overlay-light group transition-all duration-300 ${
                                            isLoading ? "pointer-events-none opacity-50" : "cursor-pointer"
                                        }`}
                                        onClick={!isLoading ? handleUploadClick : undefined}
                                    >
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Avatar Preview" className="w-full h-full object-cover object-center bg-no-repeat" />
                                        ) : (
                                            <div className={`bg-gradient-to-br ${selectedColor} w-full h-full flex items-center justify-center`}>
                                                <User className={"w-8 h-8 text-light-secondary"} strokeWidth={2} strokeLinecap={"round"} strokeLinejoin={"round"} />
                                            </div>
                                        )}
                                        <div className={"absolute inset-0 bg-dark-secondary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"}>
                                            <Camera className={"w-6 h-6 text-light-secondary"} />
                                        </div>
                                    </div>
                                    <div className={`mt-2 text-xs hover:underline flex items-center gap-1 transition-colors duration-200 ${
                                        isLoading ? "pointer-events-none opacity-50" : "cursor-pointer"
                                    }`}>
                                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                        {previewUrl ? (
                                            <div onClick={(e) => { e.stopPropagation(); handleRemovePhoto(); }} className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors duration-300">
                                                <Trash2 className={"w-3 h-3"} strokeWidth={2} /> Remove Photo
                                            </div>
                                        ) : (
                                            <div onClick={handleUploadClick} className="flex items-center gap-1 text-indigo-500 hover:text-indigo-600 transition-colors duration-300">
                                                <Upload className={"w-3 h-3"} strokeWidth={2} /> Upload Photo
                                            </div>
                                        )}
                                    </div>
                                    <div className={"flex gap-2 mt-3 flex-wrap"}>
                                        {avatarColors.map((item, index) => {
                                            const isSelected = selectedColor === item.gradient && !previewUrl;

                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => setSelectedColor(item.gradient)}
                                                    className={`
                                                        w-6 h-6 rounded-full 
                                                        bg-gradient-to-br ${item.gradient} 
                                                        transition-all duration-200 
                                                        ring-offset-light-secondary dark:ring-offset-dark-secondary 
                                                        ${isSelected ? `ring-2 ring-offset-2 ${item.ring}` : 'hover:scale-110'}
                                                    `}
                                                />
                                            );
                                        })}
                                    </div>
                                </motion.div>
                                <form onSubmit={handleSubmit} className={"space-y-4"}>
                                    <AnimatePresence mode="wait">
                                        {error && (
                                            <motion.div
                                                key={error}

                                                initial={{ opacity: 0, y: -10, height: 0 }}

                                                animate={{ opacity: 1, y: 0, height: "auto" }}

                                                exit={{ opacity: 0, y: -10, height: 0 }}

                                                transition={{ duration: 0.2 }}
                                            >
                                                <Alert variant="destructive" className="">
                                                    <AlertCircle className="h-4 w-4" />
                                                    <AlertTitle>Error</AlertTitle>
                                                    <AlertDescription>
                                                        {error}
                                                    </AlertDescription>
                                                </Alert>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <motion.div variants={itemVariants}>
                                        <ResponsiveGrid defCols={1} smCols={2} className={"mb-4"}>
                                            <div className={"flex flex-col gap-2"}>
                                                <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Full Name</label>
                                                <div className={"relative flex-1"}>
                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><User strokeWidth={2} size={16} /></div>
                                                    <input
                                                        required={true}
                                                        name="fullname"
                                                        value={formData.fullname}
                                                        onChange={handleChange}
                                                        placeholder={"John Doe"}
                                                        autoComplete="off"
                                                        className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs" />
                                                </div>
                                            </div>
                                            <div className={"flex flex-col gap-2"}>
                                                <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Username</label>
                                                <div className={"relative flex-1"}>
                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><AtSign strokeWidth={2} size={16} /></div>
                                                    <input
                                                        required={true}
                                                        name="username"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        placeholder={"johndoe"}
                                                        autoComplete="off"
                                                        className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs" />
                                                </div>
                                            </div>
                                        </ResponsiveGrid>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className={"flex flex-col gap-2 mb-4"}>
                                        <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Email</label>
                                        <div className={"relative flex-1"}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><Mail strokeWidth={2} size={16} /></div>
                                            <input
                                                required={true}
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                type={"email"}
                                                autoComplete="off"
                                                placeholder={"you@example.com"} className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs" />
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className={"flex flex-col gap-2 mb-4"}>
                                        <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Password</label>
                                        <div className={"relative flex-1"}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><LockKeyhole strokeWidth={2} size={16} /></div>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-strong dark:text-neutral-medium cursor-pointer">
                                                {isPasswordVisible ? <EyeOff onClick={() => setIsPasswordVisible(false)} strokeWidth={2} size={16} /> : <Eye onClick={() => setIsPasswordVisible(true)} strokeWidth={2} size={16} />}
                                            </div>
                                            <input
                                                required={true}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                type={isPasswordVisible ? "text" : "password"}
                                                placeholder={".............."}
                                                autoComplete="new-password"
                                                className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-8 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs" />
                                        </div>





                                        <AnimatePresence>
                                            {isPasswordTyping &&
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, height: 0 }}

                                                    animate={{ opacity: 1, y: 0, height: "auto" }}

                                                    exit={{ opacity: 0, y: -10, height: 0 }}

                                                    transition={{ duration: 0.3, ease: "linear" }}

                                                    className={"mt-2 overflow-hidden"}>
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

                                    <motion.div variants={itemVariants} className={"flex flex-col gap-2 mb-6"}>
                                        <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Confirm Password</label>
                                        <div className={"relative flex-1"}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><LockKeyhole strokeWidth={2} size={16} /></div>
                                            <input
                                                required={true}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                type={"password"} placeholder={".............."}
                                                className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-8 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs" />
                                        </div>
                                    </motion.div>

                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        variants={itemVariants}
                                        className={"text-light-secondary dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 rounded-full cursor-pointer w-full py-2.5 md:py-3  flex items-center justify-center gap-2 shadow-md"}
                                    >
                                        <p className={"uppercase text-xs font-medium tracking-wide"}>create account</p>
                                        <ArrowRight className={"w-4 h-4"}/>
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>

                        <motion.p variants={itemVariants} className={"text-center text-neutral-strong dark:text-neutral-medium mt-6 text-sm sm:text-base"}>Already have an account? <span onClick={() => navigate("/login")} className={"text-indigo-500 hover:underline cursor-pointer"}>Sign in</span></motion.p>
                    </motion.div>
                </div>
            </ResponsiveGrid>
        </div>
    )
}
export default RegisterPage;