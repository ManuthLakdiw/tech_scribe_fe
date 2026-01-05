import ResponsiveGrid from "../ResponsiveGrid.tsx";
import {
    AlertCircle,
    ChevronRight,
    GraduationCap,
    House, Link as LinkIcon,
    Mail,
    Moon,
    PenTool,
    Phone,
    Send,
    Sparkles,
    Sun,
    TrendingUp,
    Upload,
    Users,
    Award,
    X,
    CheckCircle,
    Loader2,

} from "lucide-react";
import { useTheme } from "../../hooks/useTheme.ts";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { useAuth } from "@/hooks/useAuth.ts";
import CountUp from "react-countup";
import { getMyAuthorRequestStatus, submitAuthorRequest } from "@/services/auth.ts"; // Ensure these are imported correctly
import { toast } from "sonner";
import UnderReview from "@/components/becomeAuthor/UnderReview.tsx";
import NotApproved from "@/components/becomeAuthor/NotApproved.tsx";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } }
};


const BecomeAuthorPage = () => {
    // 1. State Definitions
    interface FormState {
        email: string;
        phoneNumber: string;
        qualifications: string;
        reason: string;
        portfolioUrl: string;
        sampleWriting: string;
    }

    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [requestStatus, setRequestStatus] = useState<'NONE' | 'PENDING' | 'APPROVED' | 'REJECTED'>('NONE');
    const [pageLoading, setPageLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>("");

    const [formData, setFormData] = useState<FormState>({
        email: user?.email || "",
        phoneNumber: "",
        qualifications: "",
        reason: "",
        portfolioUrl: "",
        sampleWriting: ""
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // 2. Check Status on Load
    useEffect(() => {
        const checkStatus = async () => {
            try {
                if (!user) {
                    setPageLoading(false);
                    return;
                }
                const result = await getMyAuthorRequestStatus();
                if (result.data) {
                    setRequestStatus(result.data.status);
                }
            } catch (error) {
                console.error("Failed to fetch status", error);
            } finally {
                setPageLoading(false);
            }
        };
        checkStatus();
    }, [user]);

    // 3. Handlers
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB Limit
                toast.error("File size should be less than 5MB");
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedFile(null);
        const fileInput = document.getElementById("upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.phoneNumber || !formData.qualifications || !formData.reason) {
            return setError("Please fill in all required fields marked with *.");
        }

        setIsSubmitting(true);

        try {
            const submissionData = new FormData();
            submissionData.append("email", formData.email);
            submissionData.append("phoneNumber", formData.phoneNumber);
            submissionData.append("qualifications", formData.qualifications);
            submissionData.append("reason", formData.reason);
            submissionData.append("portfolioUrl", formData.portfolioUrl);
            submissionData.append("sampleWriting", formData.sampleWriting);

            if (selectedFile) {
                submissionData.append("document", selectedFile);
            }

            await submitAuthorRequest(submissionData);

            toast.success("Application submitted successfully!");
            setRequestStatus('PENDING');

        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Submission failed. Please try again.");
            toast.error("Submission Failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-light-primary dark:bg-dark-primary">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    // 5. Render
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
                        className={"w-full max-w-lg"}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.h1 variants={itemVariants} className={"font-bold text-2xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end w-fit bg-clip-text text-transparent mb-6 md:mb-8"}>TechScribe</motion.h1>

                        {/* Render based on Status */}
                        <AnimatePresence mode="wait">
                            {requestStatus === 'PENDING' ? (
                                <motion.div key="pending" variants={itemVariants}>
                                    <UnderReview />
                                    <motion.p className="text-center text-neutral-strong dark:text-neutral-medium mt-6 text-sm">
                                        <span onClick={() => navigate("/dashboard")} className="text-indigo-500 hover:underline cursor-pointer">Go to Dashboard</span>
                                    </motion.p>
                                </motion.div>
                            ) : requestStatus === 'REJECTED' ? (
                                <motion.div key="rejected" variants={itemVariants}>
                                    <NotApproved />
                                    <motion.p className="text-center text-neutral-strong dark:text-neutral-medium mt-6 text-sm">
                                        <span onClick={() => setRequestStatus('NONE')} className="text-indigo-500 hover:underline cursor-pointer">Try Again</span>
                                    </motion.p>
                                </motion.div>
                            ) : requestStatus === 'APPROVED' ? (
                                <motion.div key="approved" variants={itemVariants} className="text-center p-8 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-200 dark:border-green-800/50">
                                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-green-700 dark:text-green-300">Congratulations!</h3>
                                    <p className="text-green-600 dark:text-green-400 mt-2 text-sm">You are already an approved author.</p>
                                    <button onClick={() => navigate("/dashboard")} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition">Go to Dashboard</button>
                                </motion.div>
                            ) : (
                                // Default Form View (NONE)
                                <>
                                    <motion.span className={"inline-flex items-center justify-center rounded-md border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 overflow-hidden border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 mb-4 text-xs uppercase tracking-wider"}>
                                        <GraduationCap className={"w-3 h-3 mr-1"} />
                                        author program
                                    </motion.span>
                                    <motion.h2 variants={itemVariants} className={"text-2xl md:text-3xl font-bold mb-2 text-dark-secondary dark:text-light-secondary"}>Become an Author</motion.h2>
                                    <motion.h3 variants={itemVariants} className={"mb-6 md:mb-8 text-neutral-strong dark:text-neutral-medium"}>Share your knowledge and expertise with our community</motion.h3>

                                    <motion.div
                                        variants={itemVariants}
                                        className={"w-full bg-neutral-100 dark:bg-dark-secondary/40 shadow-xl rounded-xl border border-neutral-soft dark-border py-6"}
                                    >
                                        <div className={"p-4 md:p-6 w-full min-h-full"}>
                                            <form onSubmit={handleSubmit}>
                                                <AnimatePresence mode="wait">
                                                    {error && (
                                                        <motion.div
                                                            key={error}
                                                            initial={{ opacity: 0, y: -10, height: 0 }}
                                                            animate={{ opacity: 1, y: 0, height: "auto" }}
                                                            exit={{ opacity: 0, y: -10, height: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className={"mb-4"}
                                                        >
                                                            <Alert variant="destructive">
                                                                <AlertCircle className="h-4 w-4" />
                                                                <AlertTitle>Error</AlertTitle>
                                                                <AlertDescription>{error}</AlertDescription>
                                                            </Alert>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Form Fields */}
                                                <div className={"flex flex-col sm:flex-row sm:gap-4"}>
                                                    <div className={"flex flex-col gap-2 mb-4 flex-1"}>
                                                        <label className={"text-sm text-dark-secondary dark:text-light-secondary"}>Contact Email*</label>
                                                        <div className={"relative"}>
                                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-strong dark:text-neutral-medium"><Mail size={16} /></div>
                                                            <input
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                placeholder={"you@example.com"}
                                                                className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className={"flex flex-col gap-2 mb-4 flex-1"}>
                                                        <label className={"text-sm text-dark-secondary dark:text-light-secondary"}>Phone Number*</label>
                                                        <div className={"relative"}>
                                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-strong dark:text-neutral-medium"><Phone size={16} /></div>
                                                            <input
                                                                name="phoneNumber"
                                                                value={formData.phoneNumber}
                                                                onChange={handleChange}
                                                                placeholder={"+1 (555) 000-0000"}
                                                                className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={"flex flex-col gap-2 mb-4"}>
                                                    <label className={"text-sm text-dark-secondary dark:text-light-secondary"}>Qualifications & Experience *</label>
                                                    <textarea
                                                        name="qualifications"
                                                        value={formData.qualifications}
                                                        onChange={handleChange}
                                                        rows={3}
                                                        placeholder={"Tell us about your technical background..."}
                                                        className="w-full text-sm font-light border dark-border py-[0.47rem] px-4 rounded-lg bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary focus:ring-1 focus:ring-primary focus:outline-none transition-all resize-none"
                                                    />
                                                </div>

                                                <div className={"flex flex-col gap-2 mb-4"}>
                                                    <label className={"text-sm text-dark-secondary dark:text-light-secondary"}>Why do you want to write for us? *</label>
                                                    <textarea
                                                        name="reason"
                                                        value={formData.reason}
                                                        onChange={handleChange}
                                                        rows={3}
                                                        placeholder={"What topics are you passionate about?..."}
                                                        className="w-full text-sm font-light border dark-border py-[0.47rem] px-4 rounded-lg bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary focus:ring-1 focus:ring-primary focus:outline-none transition-all resize-none"
                                                    />
                                                </div>

                                                <div className={"flex flex-col gap-2 mb-4"}>
                                                    <label className={"text-sm text-dark-secondary dark:text-light-secondary"}>Portfolio / Work Samples URL</label>
                                                    <div className={"relative"}>
                                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-strong dark:text-neutral-medium"><LinkIcon size={16} /></div>
                                                        <input
                                                            name="portfolioUrl"
                                                            value={formData.portfolioUrl}
                                                            onChange={handleChange}
                                                            placeholder={"https://github.com/yourusername"}
                                                            className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <div className={"flex flex-col gap-2 mb-4"}>
                                                    <label className={"text-sm text-dark-secondary dark:text-light-secondary"}>Sample Writing (Optional)</label>
                                                    <textarea
                                                        name="sampleWriting"
                                                        value={formData.sampleWriting}
                                                        onChange={handleChange}
                                                        rows={3}
                                                        placeholder={"Paste a sample here..."}
                                                        className="w-full text-sm font-light border dark-border py-[0.47rem] px-4 rounded-lg bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary focus:ring-1 focus:ring-primary focus:outline-none transition-all resize-none"
                                                    />
                                                </div>

                                                <div className={"flex flex-col gap-2 mb-4"}>
                                                    <label className={"text-sm text-dark-secondary dark:text-light-secondary"}>Supporting Documents</label>
                                                    {!selectedFile ? (
                                                        <label htmlFor={"upload"} className={"flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:border-primary/50 hover:bg-accent/30 transition-all cursor-pointer group"}>
                                                            <Upload className={"w-8 h-8 mb-2 text-muted-foreground group-hover:text-primary transition-colors"} />
                                                            <p className={"text-sm text-muted-foreground"}>Click to upload resume, certificates</p>
                                                            <p className={"text-xs text-muted-foreground mt-1"}>PDF, DOC, DOCX up to 5MB</p>
                                                        </label>
                                                    ) : (
                                                        <div className={"relative flex flex-col items-center justify-center border-2 border-primary/50 bg-primary/5 rounded-xl p-6 text-center"}>
                                                            <button onClick={handleRemoveFile} className="absolute top-2 right-2 p-1.5 hover:bg-red-100 text-muted-foreground hover:text-red-500 rounded-full transition-colors"><X size={16} /></button>
                                                            <CheckCircle className={"w-8 h-8 mb-2 text-green-500"} />
                                                            <p className={"text-sm font-semibold"}>File Selected!</p>
                                                            <p className={"text-sm text-primary mt-1 break-all"}>{selectedFile.name}</p>
                                                            <label htmlFor="upload" className="mt-3 text-xs text-muted-foreground hover:text-primary underline cursor-pointer">Change file</label>
                                                        </div>
                                                    )}
                                                    <input id={"upload"} type="file" accept=".pdf, .doc, .docx, image/*" className="hidden" onChange={handleFileChange} />
                                                </div>

                                                <motion.button
                                                    type={"submit"}
                                                    disabled={isSubmitting}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={"text-light-secondary dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 rounded-full cursor-pointer w-full py-2.5 md:py-3 flex items-center justify-center gap-4 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"}
                                                >
                                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className={"w-4 h-4"}/>}
                                                    <p className={"uppercase text-xs font-medium tracking-wide"}>{isSubmitting ? "Submitting..." : "Submit Application"}</p>
                                                </motion.button>
                                            </form>
                                        </div>
                                    </motion.div>
                                    <motion.p variants={itemVariants} className={"text-center text-neutral-strong dark:text-neutral-medium mt-6 text-sm sm:text-base"}>Already an author? <span onClick={() => navigate("/dashboard")} className={"text-indigo-500 hover:underline cursor-pointer"}>Go to Dashboard</span></motion.p>
                                </>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Right Side Panel (Benefits) - No Changes */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={"w-full sticky top-0 h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hidden lg:flex flex-col items-center justify-center relative"}
                >
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
                        {/* ... (Benefits Card Content same as previous) ... */}
                        <div className="relative w-full min-w-md bg-light-primary/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl z-30">
                            <div className={"flex items-center gap-3 mb-6"}>
                                <div className={"w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"}>
                                    <Sparkles className={"w-6 h-6 text-light-secondary"}/>
                                </div>
                                <div>
                                    <h2 className={"text-xl font-bold text-white"}>Author Benefits</h2>
                                    <p className={"text-light-secondary/70 text-sm"}>Why join our author program?</p>
                                </div>
                            </div>
                            {/* Benefits List */}
                            <div className={"space-y-4"}>
                                {[
                                    { icon: PenTool, title: "Author Tools", desc: "Access to premium writing tools" },
                                    { icon: Users, title: "Build Audience", desc: "Grow your following and establish authority" },
                                    { icon: TrendingUp, title: "Track Analytics", desc: "Monitor views, likes, and engagement" },
                                    { icon: Award, title: "Get Featured", desc: "Top articles featured on our homepage" }
                                ].map((benefit, i) => (
                                    <div key={i} className={"flex items-start gap-4 p-3 rounded-xl bg-light-secondary/5 hover:bg-light-secondary/10 transition-colors group"}>
                                        <div className={"w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-light-secondary/20 transition-colors"}>
                                            <benefit.icon className={"w-5 h-5 text-light-secondary"}/>
                                        </div>
                                        <div>
                                            <h3 className={"font-semibold text-white flex items-center gap-2"}>
                                                {benefit.title}
                                                <ChevronRight className={"w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"}/>
                                            </h3>
                                            <p className={"text-light-secondary/70 text-sm"}>{benefit.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Stats */}
                            <div className={"grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-light-secondary/10"}>
                                <div className={"text-center"}>
                                    <p className={"text-2xl font-bold text-white"}><CountUp end={12} duration={2} suffix={"+"} /></p>
                                    <p className={"text-xs text-light-secondary/70"}>Active Authors</p>
                                </div>
                                <div className={"text-center"}>
                                    <p className={"text-2xl font-bold text-white"}><CountUp end={100} duration={2} suffix={"+"} /></p>
                                    <p className={"text-xs text-light-secondary/70"}>Articles</p>
                                </div>
                                <div className={"text-center"}>
                                    <p className={"text-2xl font-bold text-white"}><CountUp end={15} duration={2} suffix="K+" /></p>
                                    <p className={"text-xs text-light-secondary/70"}>Readers</p>
                                </div>
                            </div>
                        </div>
                        <p className={"text-center text-white/70 mt-6 text-sm"}>Join our growing community of technical writers</p>
                    </motion.div>
                </motion.div>
            </ResponsiveGrid>
        </div>
    );
};

export default BecomeAuthorPage;