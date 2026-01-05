import ResponsiveGrid from "../ResponsiveGrid.tsx";
import {
    AlertCircle,
    ArrowRight,
    Eye,
    EyeOff,
    House,
    LockKeyhole,
    Mail,
    Moon, Quote,
    Sun,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme.ts";
import {AnimatePresence, motion, type Variants} from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination, Navigation} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {toast} from "sonner";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {handleApiError} from "@/utils/handleApiErrorUtil.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/redux/store.ts";
import {loginUser} from "@/redux/features/authSlice.ts";
import {useAuth} from "@/hooks/useAuth.ts";

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

const testimonials = [
    {
        quote: "TechScribe has transformed how I learn new technologies. The quality of content here is unmatched.",
        author: "Dan Abramov",
        role: "React Core Team",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
        quote: "Finally, a platform where developers can share deep technical knowledge without compromising on quality.",
        author: "Sarah Drasner",
        role: "VP of Developer Experience",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
        quote: "The MDX editor and developer-focused features make TechScribe my go-to platform for technical writing.",
        author: "Kent C. Dodds",
        role: "Educator & Developer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
        quote: "I've found my community here. TechScribe brings together the best in software engineering.",
        author: "Cassidy Williams",
        role: "Director of Developer Experience",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
];

const LoginPage = () => {

    interface formState {
        email: string;
        password: string;
    }
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useAuth()
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [formData, setFormData] = useState<formState>({
        email: "",
        password: ""
    });




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")


        const toastId = toast.loading("Logging in...",{
                description: "Verifying your credentials...",
            }

        )

        try {
            const result = await dispatch(loginUser({
                email: formData.email,
                password: formData.password,
                remember: rememberMe
            })).unwrap()

            console.log(result)

            toast.success("User logged in successfully!", {
                id: toastId,
                description: "Welcome back!",
                duration: 3000,
            });

            navigate("/");

        }catch (error: any) {
            console.log(error)
            console.error("Login Failed:", error);
            handleApiError(error, toastId, "Login failed!");

        }

    }


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
                <div className={"w-full min-h-screen bg-light-primary dark:bg-dark-primary flex-1 flex items-center justify-center px-4 px-4 sm:px-6 lg:px-8 pt-20 overflow-y-auto"}>
                    <motion.div
                        className={"w-full max-w-md"}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.h1 variants={itemVariants} className={"font-bold text-2xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end w-fit bg-clip-text text-transparent mb-6 md:mb-8"}>TechScribe</motion.h1>
                        <motion.h2 variants={itemVariants} className={"text-2xl md:text-3xl font-bold mb-2 text-dark-secondary dark:text-light-secondary"}>Welcome back</motion.h2>
                        <motion.h3 variants={itemVariants} className={"mb-6 md:mb-8 text-neutral-strong dark:text-neutral-medium"}>Sign in to your account to continue</motion.h3>

                        <motion.div
                            variants={itemVariants}
                            className={"w-full min-h-[324px] bg-light-secondary dark:bg-dark-secondary/40 shadow-xl rounded-xl border border-neutral-soft dark-border py-6"}
                        >
                            <div className={"p-4 md:p-6 w-full min-h-full"}>
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
                                    <motion.div variants={itemVariants} className={"flex flex-col gap-2 mb-4"}>
                                        <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Email</label>
                                        <div className={"relative flex-1"}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><Mail strokeWidth={2} size={16} /></div>
                                            <input
                                                required
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                type={"email"}
                                                placeholder={"you@example.com"}
                                                className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs" />
                                        </div>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className={"flex flex-col gap-2 mb-4"}>
                                        <label className={"flex justify-between items-center"}>
                                            <span className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Password</span>
                                            <Link className={"text-xs text-indigo-500 hover:underline"} to={"/reset-password"}>Forgot password?</Link>
                                        </label>
                                        <div className={"relative flex-1"}>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><LockKeyhole strokeWidth={2} size={16} /></div>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-strong dark:text-neutral-medium cursor-pointer">
                                                {isPasswordVisible ? <EyeOff onClick={() => setIsPasswordVisible(false)} strokeWidth={2} size={16} /> : <Eye onClick={() => setIsPasswordVisible(true)} strokeWidth={2} size={16} />}
                                            </div>
                                            <input
                                                name="password"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                                type={isPasswordVisible ? "text" : "password"}
                                                placeholder={".............."}
                                                className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-8 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs" />
                                        </div>
                                    </motion.div>

                                    <div className="">
                                        <label className={"text-sm text-neutral-strong dark:text-neutral-medium cursor-pointer flex items-center space-x-2 mb-4"}>
                                            <input
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                type="checkbox"
                                                className="
                                                appearance-none
                                                cursor-pointer
                                                w-4 h-4
                                                rounded-sm
                                                border border-neutral-soft dark-border
                                                bg-light-secondary dark:bg-dark-secondary

                                                checked:bg-dark-secondary dark:checked:bg-light-secondary
                                                checked:border-neutral-soft dark:checked:dark-border

                                                focus:outline-1
                                                focus:outline-neutral-strong/50
                                                focus:ring-3
                                                focus:ring-neutral-strong/30
                                                dark:focus:ring-neutral-strong/60
                                                focus:ring-offset-0

                                                transition-all duration-300 ease-in-out shadow-xs

                                                relative

                                                before:content-['']
                                                before:absolute
                                                before:inset-0
                                                before:flex
                                                before:items-center
                                                before:justify-center

                                                checked:before:content-['✔']
                                                checked:before:text-white
                                                dark:checked:before:text-dark-secondary
                                                checked:before:text-[12px]
                                                checked:before:font-bold
                                            "
                                            />
                                            <span>Remember me</span>
                                        </label>

                                    </div>
                                    <motion.button
                                        type={"submit"}
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        variants={itemVariants}
                                        className={"text-light-secondary dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 rounded-full cursor-pointer w-full py-2.5 md:py-3 flex items-center justify-center gap-2 shadow-md"}
                                    >
                                        <p className={"uppercase text-xs font-medium tracking-wide"}>sign in</p>
                                        <ArrowRight className={"w-4 h-4"}/>
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>

                        <motion.p variants={itemVariants} className={"text-center text-neutral-strong dark:text-neutral-medium mt-6 text-sm sm:text-base"}>Don't have an account? <span onClick={() => navigate("/register")} className={"text-indigo-500 hover:underline cursor-pointer"}>Sign up</span></motion.p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={"w-full sticky top-0 h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hidden lg:flex flex-col items-center justify-center relative"}
                >

                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
                        <motion.div
                            className={"absolute xl:top-24 xl:left-24 z-20"}

                            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: -90 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <motion.div
                                className={"w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl"}
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
                        <motion.div
                            className={"absolute bottom-24 right-24"}

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

                        <div className="relative w-full max-w-lg h-[400px] bg-light-primary/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">

                            <div className="text-yellow-400 text-2xl flex flex-col">
                                <div className={"flex gap-10 mb-4"}>★★★★★</div>
                                <Quote className={"w-10 h-10 text-light-primary/40 mb-4"}/>
                            </div>

                            <Swiper
                                direction={'vertical'}
                                spaceBetween={30}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper w-full h-full"
                            >
                                {testimonials.map((testimonial, index) => (
                                    <SwiperSlide key={index} className="flex flex-col justify-center h-full">
                                        <div className="text-white">
                                            <p className="text-light-secondary text-xl font-medium mb-6 leading-relaxed">
                                                "{testimonial.quote}"
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full border-2 border-pink-200 bg-cover bg-no-repeat" style={{backgroundImage: `url(${testimonial.avatar})`}}>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-light-secondary text-lg">{testimonial.author}</h4>
                                                    <p className="text-light-secondary/70 text-sm">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}

                            </Swiper>

                            <style>{`
                              .swiper-pagination-bullet {
                                background: rgba(255, 255, 255, 0.5);
                                opacity: 1;
                              }
                              .swiper-pagination-bullet-active {
                                background: #ffffff;
                                width: 20px;
                                border-radius: 5px;
                                transition: all 0.3s;
                              }
                            `}</style>

                        </div>
                    </motion.div>
                </motion.div>

            </ResponsiveGrid>
        </div>
    )
}
export default LoginPage;