import { motion } from "framer-motion";
import ResponsiveGrid from "./ResponsiveGrid.tsx";
import {Github, Linkedin, Mail, Twitter} from "lucide-react";

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}

            whileInView={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8, ease: "easeOut" }}

            viewport={{ once: true }}
            className={"w-full min-h-1/3 bg-light-secondary dark:bg-dark-secondary border-t border-neutral-soft" +
            " dark-border pt-11 px-4 lg:px-20 flex flex-col gap-10 theme-transition"}
        >
            <ResponsiveGrid defCols={2} mdCols={6} className={"gap-10"} >
                <div className="flex flex-col col-span-2 md:col-span-2 lg:col-span-2 gap-4">
                    <div className={"flex flex-col gap-4"}>
                        <h1 className={"font-bold text-2xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end w-fit " +
                            "bg-clip-text text-transparent"}
                        >
                            TechScribe
                        </h1>
                        <p className={"text-sm font-light text-neutral-strong dark:text-neutral-medium"}>
                            A modern platform for developers to share
                                <span className={"block md:inline xl:block"}>
                                    knowledge, learn from experts, and grow
                                </span>
                            together.
                        </p>
                    </div>
                   <div className={"flex gap-4"}>
                       <motion.div
                           whileHover={{ scale: 1.1 }}
                           className={"p-[0.6rem] bg-light-primary  dark:bg-overlay-light rounded-full text-neutral-strong" +
                               " dark:text-neutral-medium hover:text-dark-secondary dark:hover:text-neutral-soft cursor-pointer" +
                               " transition-all duration-150 flex items-center justify-center"}
                       >
                           <Twitter size={18} />
                       </motion.div>

                       <motion.div
                           whileHover={{ scale: 1.1 }}
                           className={"p-[0.6rem] bg-light-primary  dark:bg-overlay-light rounded-full text-neutral-strong" +
                               " dark:text-neutral-medium hover:text-dark-secondary dark:hover:text-neutral-soft cursor-pointer" +
                               " transition-all duration-150 flex items-center justify-center"}
                       >
                           <Github size={18} />
                       </motion.div>

                       <motion.div
                           whileHover={{ scale: 1.1 }}
                           className={"p-[0.6rem] bg-light-primary  dark:bg-overlay-light rounded-full text-neutral-strong" +
                               " dark:text-neutral-medium hover:text-dark-secondary dark:hover:text-neutral-soft cursor-pointer" +
                               " transition-all duration-150 flex items-center justify-center"}
                       >
                           <Linkedin size={18} />
                       </motion.div>

                       <motion.div
                           whileHover={{ scale: 1.1 }}
                           className={"p-[0.6rem] bg-light-primary  dark:bg-overlay-light rounded-full text-neutral-strong" +
                               " dark:text-neutral-medium hover:text-dark-secondary dark:hover:text-neutral-soft cursor-pointer" +
                               " transition-all duration-150 flex items-center justify-center"}
                       >
                           <Mail size={18} />
                       </motion.div>
                   </div>

                </div>
                <div className="flex flex-col gap-4 col-span-1">
                    <h2 className={"font-medium text-dark-secondary  dark:text-light-secondary"}>Product</h2>
                    <div className={"flex flex-col gap-3 font-light text-sm text-neutral-strong dark:text-neutral-medium cursor-pointer"}>
                        {["Features", "Blog", "CategoriesSection", "Pricing"].map((item, index) => (
                            <p
                                key={index}
                                className="hover:text-dark-secondary dark:hover:text-neutral-soft transition-all duration-300 cursor-pointer"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className={"font-medium text-dark-secondary  dark:text-light-secondary"}>Company</h2>
                    <div className={"flex flex-col gap-3 font-light text-sm text-neutral-strong dark:text-neutral-medium cursor-pointer"}>
                        {["About", "Contact", "Careers", "Press"].map((item, index) => (
                            <p
                                key={index}
                                className="hover:text-dark-secondary dark:hover:text-neutral-soft transition-all duration-300 cursor-pointer"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"font-medium text-dark-secondary  dark:text-light-secondary"}>Resources</h2>
                    <div className={"flex flex-col items-start gap-3 font-light text-sm text-neutral-strong dark:text-neutral-medium"}>
                        {["Documentation", "Help Center", "Community", "Guides"].map((item, index) => (
                            <p
                                key={index}
                                className="hover:text-dark-secondary dark:hover:text-neutral-soft transition-all duration-300 cursor-pointer"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={"flex flex-col text-dark gap-4"}>
                    <h2 className={"font-medium text-dark-secondary  dark:text-light-secondary"}>Legal</h2>
                    <div className={"flex flex-col gap-3 font-light text-sm text-neutral-strong dark:text-neutral-medium cursor-pointer"}>
                        {["Privacy", "Terms", "Cookies", "License"].map((item, index) => (
                            <p
                                key={index}
                                className="hover:text-dark-secondary dark:hover:text-neutral-soft transition-all duration-300 cursor-pointer"
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </ResponsiveGrid>
            <div className={"w-full py-6 border-t border-neutral-soft dark-border flex justify-center sm:justify-between" +
                " gap-y-3 gap-x-20 flex-wrap font-light text-sm text-neutral-strong dark:text-neutral-medium text-center"}
            >
                <p>©2025 TechScribe. All rights reserved.</p>
                <p>Built with ❤️ for developers worldwide</p>

            </div>
        </motion.footer>
    )
}

export default Footer;