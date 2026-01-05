import {AnimatePresence, motion, useMotionValueEvent, useScroll} from "framer-motion";
import {Menu, Moon, Sun} from "lucide-react";
import MobileNavBar from "./MobileNavBar.tsx";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {cn} from "../utils/cnUtil.ts";
import {useTheme} from "../hooks/useTheme.ts";
import {useAuth} from "@/hooks/useAuth.ts";
import Auth from "@/components/Auth.tsx";

const Header = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const location = useLocation();
    const {pathname} = location;
    const {theme,toggleTheme} = useTheme();
    const { user , isLoading } = useAuth();

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log(latest)
        if (latest > 20) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    }, [isMobileMenuOpen]);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const links = [
        {
            path: "/",
            name: "Home"
        },
        {
            path: "/blogs",
            name: "Blogs"
        },
        {
            path: "/categories",
            name: "Categories"
        },
        {
            path: "/about",
            name: "About Us"
        },
        {
            path: "/contact",
            name: "Contact"
        },

        {
            path: "/authors",
            name: "Authors"
        }

    ];


    return (
        <header>
            <motion.div

                initial={{ y: -100, opacity: 0 }}

                animate={{ y: 0, opacity: 1 }}

                transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: "easeOut"
                }}

                className={cn(
                    "w-full h-20 flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 fixed top-0 z-50 transition-all duration-300 theme-transition",
                    {
                        "bg-transparent border-none backdrop-blur-0": !isScrolled,
                        "bg-light-secondary/90 border-b-1 border-neutral-soft dark:bg-dark-primary/90 dark-border backdrop-blur-sm": isScrolled
                    }
                )}>
                <h1 className={"font-bold text-2xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end " +
                    "bg-clip-text text-transparent mr-4 "}
                >
                    TechScribe
                </h1>
                <div className={"flex gap-3 text-sm text-neutral-strong dark:text-neutral-medium hidden lg:flex"}>
                    {links.map((link, key) => {

                        const isActive = pathname === link.path;

                        return (
                            <Link
                                key={key}
                                to={link.path}
                                className={cn(
                                    "relative py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer truncate",
                                    isActive ? "text-dark-secondary dark:text-light-secondary" : "hover:text-dark-secondary dark:hover:text-light-secondary"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="active-nav-pill"
                                        className="absolute inset-0 bg-dark-secondary/3 dark:bg-overlay-light rounded-md -z-10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                    />
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>
                <div className={"flex gap-2 items-center justify-center"}>
                    <div
                        onClick={toggleTheme}
                        className={"p-0.5 md:p-3 rounded-full hover:bg-light-primary transition-all duration-300 " +
                            "text-dark-secondary dark:text-light-secondary dark:hover:bg-overlay-light"}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {theme === "dark" ? (
                                <motion.div
                                    key="moon"
                                    initial={{ opacity: 0, rotate: -90, scale: 0 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Moon strokeWidth={2} size={17} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="sun"
                                    initial={{ opacity: 0, rotate: -90, scale: 0 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 90, scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Sun strokeWidth={2} size={17} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    { isLoading ? (
                        <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse"></div>
                    ) : user ? (
                        <Auth />
                    ) : (
                        <>
                            <Link className={"text-xs text-dark-secondary dark:text-light-secondary font-secondary uppercase tracking-wider font-medium px-6 py-3 text-center " +
                                "rounded-full hover:bg-light-primary dark:hover:bg-overlay-light cursor-pointer tracking-widest transition-all duration-300 hidden md:block"}
                                  to={"/login"}>
                                sign in
                            </Link>
                            <Link
                                className={"text-xs font-secondary uppercase tracking-wider font-medium text-light-secondary text-center " +
                                    "dark:text-dark-secondary font-bold bg-dark-secondary dark:bg-light-secondary px-6 py-3 " +
                                    "rounded-full hover:bg-neutral-800 cursor-pointer tracking-widest dark:hover:bg-neutral-soft hidden md:block transition-all duration-300"}
                                to={"/register"} >
                                get started
                            </Link>
                        </>
                    )}
                    <div
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={"px-0.5 md:px-[1.4rem] md:block lg:hidden text-dark-secondary dark:text-light-secondary"}>
                        <Menu strokeWidth={2} size={17}/>
                    </div>
                </div>
            </motion.div>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileNavBar
                        key="mobileNavBar"
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                        links={links}
                        pathName={pathname}

                    />
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header
