import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/redux/store.ts";
import {useAuth} from "@/hooks/useAuth.ts";
import {logout} from "@/redux/features/authSlice.ts";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import {ChartColumn, GraduationCap, LogOut, PenTool, Settings, User} from "lucide-react";
import {Link} from "react-router-dom";

const Auth = () => {
    const {user} = useAuth()
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    if (!user) return null;

    const {profilePictureURL: profilePic, color, shortName: initial, fullname:name, email, roles} = user


    const userRoles = (roles || []) as string[];

    const isAdmin = userRoles.includes("ADMIN");
    const isAuthor = userRoles.includes("AUTHOR");

    return (
       <div className={"relative"} ref={menuRef}>
           <div
               onClick={() => setIsOpen(!isOpen)}
               className={"shrink-0 overflow-hidden rounded-full h-9 w-9 md:h-10 md:w-10 bg-dark-secondary/3 dark:bg-overlay-light shadow-xs"}>
               {profilePic ? (
                   <img
                       src={profilePic}
                       alt={initial}
                       className="w-full h-full object-cover"
                   />
               ) : (
                   <div
                       className={`w-full h-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${color}`}
                   >
                       {initial}
                   </div>
               )}
           </div>
           <AnimatePresence>
               {isOpen && (
                   <motion.div
                       initial={{ opacity: 0, scale: 0.95, y: -20 }}

                       animate={{ opacity: 1, scale: 1, y: 0 }}

                       exit={{ opacity: 0, scale: 0.95, y: -10 }}

                       transition={{ type: "spring", stiffness: 300, damping: 20 }}
                       className={"md:w-56 h-auto border border-neutral-soft dark-border  bg-neutral-100 dark:bg-neutral-950 shadow-md rounded-lg overflow-hidden absolute right-0 top-full mt-2 p-1 z-100" }
                   >
                       <div className={"flex items-center justify-start gap-2 p-2"}>
                           <div
                               className={"shrink-0 overflow-hidden rounded-full h-9 w-9 md:h-10 md:w-10 bg-dark-secondary/3 dark:bg-overlay-light shadow-xs"}>
                               {profilePic ? (
                                   <img
                                       src={profilePic}
                                       alt={initial}
                                       className="w-full h-full object-cover"
                                   />
                               ) : (
                                   <div
                                       className={`w-full h-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${color}`}
                                   >
                                       {initial}
                                   </div>
                               )}
                           </div>
                           <div className={"flex flex-col min-w-0"}>
                               <h3 className={"truncate text-dark-secondary dark:text-light-secondary text-[0.95rem]"}>{name}</h3>
                               <p className={"text-xs text-muted-foreground font-light truncate"}>{email}</p>
                           </div>
                       </div>
                       <div className={"bg-border -mx-1 my-1 h-px"}></div>
                       <div>
                           <div className={"px-2 py-1.5 flex items-center gap-2 text-sm text-dark-secondary dark:text-light-secondary " +
                               "cursor-pointer rounded-sm hover:bg-dark-secondary/4 dark:hover:bg-overlay-light transition-colors duration-300 ease-in-out font-light"}>
                               <User className={"w-4 h-4 mr-2 text-muted-foreground"}  />
                               <p>My Profile</p>
                           </div>

                           {isAdmin && (
                               <Link to={"/dashboard/admin-panel"} className={"px-2 py-1.5 flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300 ease-in-out font-light"}>
                                   <ChartColumn className={"w-4 h-4 mr-2 text-muted-foreground"}/>
                                   <p>Admin Dashboard</p>
                               </Link>
                           )}

                           {(isAuthor || isAdmin) && (
                               <Link to={"/dashboard/author-panel"} className={"px-2 py-1.5 flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300 ease-in-out font-light"}>
                                   <PenTool className={"w-4 h-4 mr-2 text-muted-foreground"}/>
                                   <p>Author Dashboard</p>
                               </Link>
                           )}
                           {(!isAuthor && !isAdmin) && (
                               <Link to={"/become-author"} className={"px-2 py-1.5 flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-300 ease-in-out font-light"}>
                                   <GraduationCap className={"w-4 h-4 mr-2 text-muted-foreground"}/>
                                   <p>Become an Author</p>
                               </Link>
                           )}
                           <Link to={"/settings"} className={"px-2 py-1.5 flex items-center gap-2 text-sm text-dark-secondary dark:text-light-secondary " +
                               "cursor-pointer rounded-sm hover:bg-dark-secondary/4 dark:hover:bg-overlay-light transition-colors duration-300 ease-in-out font-light"}>
                               <Settings className={"w-4 h-4 mr-2 text-muted-foreground"}  />
                               <p>Settings</p>
                           </Link>
                       </div>
                       <div className={"bg-border -mx-1 my-1 h-px"}></div>
                       <button
                           onClick={handleLogout}
                           className={"w-full px-2 py-1.5 flex items-center gap-2 text-sm text-destructive " +
                           "cursor-pointer rounded-sm hover:bg-dark-secondary/4 dark:hover:bg-overlay-light transition-colors duration-300 ease-in-out"}>
                           <LogOut className={"w-4 h-4 mr-2 text-muted-foreground"}  />
                           <p>Log Out</p>
                       </button>
                   </motion.div>
               )}
           </AnimatePresence>
       </div>
    )
}
export default Auth

