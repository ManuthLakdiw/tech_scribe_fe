import { motion } from "framer-motion";
import {BookOpen, Folder, House, Info, Mail, Users, X} from "lucide-react";
import {Link} from "react-router-dom";
import {cn} from "../utils/cnUtil.ts";


interface LinkItem {
    path: string;
    name: string;
}


interface MobileNavBarProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (value: boolean) => void;
    pathName: string;
    links: LinkItem[]
}

const MobileNavBar = ({ isMobileMenuOpen, setIsMobileMenuOpen,links, pathName}: MobileNavBarProps) => {

    const icons = [
        <House size={20} />,
        <BookOpen size={20} />,
        <Folder size={20} />,
        <Info size={20} />,
        <Mail size={20} />,
        <Users size={20} />,


    ]


    return (
        <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full h-screen fixed top-0 right-0 z-[60] flex lg:hidden theme-transition"
        >

            <motion.div
                className="bg-gradient-to-l from-dark-secondary/50 via-dark-secondary/30 to-transparent h-screen flex-1"

                onClick={() => setIsMobileMenuOpen(false)}
            />


            <motion.div
                layout
                className="bg-light-secondary border-l border-neutral-soft dark-border dark:bg-dark-primary h-screen flex flex-col shadow-2xl
                           w-2/5 min-w-[320px] max-w-full"
            >

                <div className="flex items-center justify-between p-5 border-b dark:text-light-secondary  border-neutral-soft dark-border">
                    <h1 className="text-lg font-semibold">Menu</h1>
                    <button className={"text-dark-secondary dark:text-light-secondary p-1 rounded-full hover:bg-neutral-100 transition-all duration-300 cursor-pointer"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <X strokeWidth={2} size={17} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 p-5 text-sm font-medium text-neutral-strong dark:text-neutral-medium flex-grow-1">
                    {links.map((link, index) => {
                        const isActive = pathName === link.path;

                        return (
                            <Link
                                key={index}
                                to={link.path}
                                onClick={() => !isActive && setIsMobileMenuOpen(false)}
                                className={cn(
                                    "relative flex items-center gap-3 rounded-md px-2 py-3 transition-colors duration-300 cursor-pointer",
                                    isActive
                                        ? "text-dark-secondary bg-light-primary dark:text-light-secondary dark:bg-overlay-light"
                                        : " hover:text-dark-secondary dark:hover:text-light-secondary"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="active-nav-pill"
                                        className="absolute inset-0 dark:bg-light-primary bg-overlay-light rounded-md -z-10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                        }}
                                    />
                                )}

                                <span className="relative z-10 flex items-center gap-3">
                                     {icons[index]}
                                    <span>{link.name}</span>
                                </span>
                            </Link>
                        );
                    })}
                </div>

                <div className=" text-sm flex flex-col gap-3 p-5 border-t border-neutral-soft dark-border">
                    <Link className="text-center border border-neutral-soft dark-border dark:bg-overlay-light dark:text-light-secondary px-4 py-2 rounded-lg" to={"/login"}>Sign in</Link>
                    <Link className="text-center bg-dark-secondary dark:bg-light-secondary text-white dark:text-dark-secondary px-4 py-2 rounded-lg" to={"/register"}>Get Started</Link>
                </div>
            </motion.div>

        </motion.div>
    );
};

export default MobileNavBar;