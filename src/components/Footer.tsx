import { motion } from "framer-motion";
import ResponsiveGrid from "./ResponsiveGrid.tsx";
import {Github, Linkedin, Mail, Twitter} from "lucide-react";

const Footer = () => {
    return (
        <div className={"w-full min-h-1/3 bg-white dark:bg-dark-techScribe border-t border-neutral-200 dark:border-white/10  pt-11 px-4 lg:px-20 flex flex-col gap-10"}>
            <ResponsiveGrid defCols={2} mdCols={6} className={"gap-10"} >
                <div className="flex flex-col col-span-2 md:col-span-2 lg:col-span-2 gap-4">
                    <div className={"flex flex-col gap-4"}>
                        <h1 className={"font-bold text-[1.7rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"} >
                            TechScribe
                        </h1>
                        <p className={"text-sm font-light text-neutral-500 dark:text-neutral-400"}>
                            A modern platform for developers to share <span className={"block md:inline xl:block"}> knowledge, learn from experts, and grow </span> together.
                        </p>
                    </div>
                   <div className={"flex gap-4"}>
                       <motion.div
                           whileHover={{ scale: 1.1 }}
                           className={"icon-wrapper"}
                       >
                           <Twitter size={18} />
                       </motion.div>

                       <motion.div
                           whileHover={{ scale: 1.1 }}
                           className={"icon-wrapper"}
                       >
                           <Github size={18} />
                       </motion.div>

                       <motion.div
                           whileHover={{ scale: 1.1 }}
                           className={"icon-wrapper"}
                       >
                           <Linkedin size={18} />
                       </motion.div>

                       <motion.div
                           whileHover={{ scale: 1.1 }}
                           className={"icon-wrapper"}
                       >
                           <Mail size={18} />
                       </motion.div>
                   </div>

                </div>
                <div className="flex flex-col gap-4 col-span-1">
                    <h2 className={"font-medium text-dark-techScribe dark:text-white"}>Product</h2>
                    <div className={"flex flex-col gap-3 font-light text-sm text-neutral-500 dark:text-neutral-400 cursor-pointer"}>
                        {["Features", "Blog", "Categories", "Pricing"].map((item, index) => (
                            <p
                                key={index}
                                className="hover:text-dark-techScribe dark:hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className={"font-medium text-dark-techScribe dark:text-white"}>Company</h2>
                    <div className={"flex flex-col gap-3 font-light text-sm text-neutral-500 dark:text-neutral-400 cursor-pointer"}>
                        {["About", "Contact", "Careers", "Press"].map((item, index) => (
                            <p
                                key={index}
                                className="hover:text-dark-techScribe dark:hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"font-medium text-dark-techScribe dark:text-white"}>Resources</h2>
                    <div className={"flex flex-col items-start gap-3 font-light text-sm text-neutral-500 dark:text-neutral-400"}>
                        {["Documentation", "Help Center", "Community", "Guides"].map((item, index) => (
                            <p
                                key={index}
                                className="hover:text-dark-techScribe dark:hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={"flex flex-col text-dark-techScribe gap-4"}>
                    <h2 className={"font-medium dark:text-white"}>Legal</h2>
                    <div className={"flex flex-col gap-3 font-light text-sm text-neutral-500 dark:text-neutral-400 cursor-pointer"}>
                        {["Privacy", "Terms", "Cookies", "License"].map((item, index) => (
                            <p
                                key={index}
                                className="hover:text-dark-techScribe dark:hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </ResponsiveGrid>
            <div className={"w-full py-6 border-t border-neutral-200 dark:border-white/10 flex justify-center sm:justify-between gap-y-3 gap-x-20 flex-wrap font-light text-sm text-neutral-500 dark:text-neutral-400 text-center"}>
                <p>©2025 TechScribe. All rights reserved.</p>
                <p>Built with ❤️ for developers worldwide</p>

            </div>
        </div>
    )
}

export default Footer;