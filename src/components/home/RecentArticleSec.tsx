import {ArrowRight, Calendar, Clock, FunnelPlus, Heart} from "lucide-react";
import ResponsiveGrid from "../ResponsiveGrid.tsx";
import formatDate from "../../utils/FormatDateUtil.ts";
import { motion } from "framer-motion";

const RecentArticleSec = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}

            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}

            transition={{ duration: 0.8, ease: "easeOut" }}

            viewport={{
                once: false,
                amount: 0.1
            }}

            className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-neutral-100 dark:bg-dark-secondary/40 overflow-hidden theme-transition"}>
            <div className={"inline-flex items-center gap-2 py-1 px-3 rounded-lg border border-neutral-200 " +
                "text-dark-secondary font-secondary uppercase text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                <FunnelPlus strokeWidth={2} size={13} />
                <h3 className={"font-medium"}>latest</h3>
            </div>
            <div className={"flex flex-col gap-y-4 sm:flex-row sm:justify-between mb-12"}>
                <h2 className={"text-2xl sm:text-3xl font-bold dark:text-light-secondary"}>Recent Articles</h2>
                <div className={"flex items-center gap-2 font-secondary uppercase text-xs tracking-widest  " +
                    "sm:px-5 rounded-lg hover:bg-neutral-soft cursor-pointer transition-all duration-300 dark:text-light-secondary dark:hover:bg-overlay-light"}>
                    <p>view all</p>
                    <ArrowRight  strokeWidth={2} size={15} />
                </div>
            </div>
            <ResponsiveGrid defCols={1} mdCols={2} lgCols={3}  className={"gap-6"}>
                {Array(6).fill(0).map((_, index) => (
                    <motion.div
                        whileHover={{
                            y: -5,
                            transition: {
                                duration: 0.1,
                                ease: "easeInOut"
                            }
                        }}
                        key={index} className={"group w-full h-[345px] border border-neutral-soft shadow-sm bg-light-secondary dark:bg-dark-secondary dark-border rounded-xl py-12 px-6 hover:shadow-lg"}>
                        <h3 className={"w-fit gap-2 py-1 px-3 rounded-lg bg-neutral-100 dark:text-dark-secondary font-medium font-secondary " +
                            "uppercase text-[0.7rem] tracking-widest mb-3"}>
                            javascript
                        </h3>
                        <p className={"text-lg font-semibold mb-2 group-hover:text-indigo-500 line-clamp-2 transition-all duration-300 cursor-pointer dark:text-light-secondary"}>
                            JavaScript Array Methods: Map, Filter, Reduce
                        </p>
                        <p className={"text-sm text-neutral-strong line-clamp-3 mb-4 dark:text-neutral-medium"}>
                            Master functional programming with JavaScript array methods. Learn how map, filter, and reduce can transform your code into elegant, declarative solutions.
                        </p>
                        <div className="flex items-center pb-3 gap-3 mb-3 border-b border-neutral-soft dark-border">
                            <div
                                className={"w-[30px] h-[30px] rounded-full bg-center bg-cover bg-no-repeat"}
                                style={{backgroundImage: `url("https://img.freepik.com/free-vector/flat-style-woman-face_90220-2936.jpg?t=st=1764870677~exp=1764874277~hmac=3bff773dd8d4e6a2f66c0971adaa978f6a061ca775916491933a65b9112f90bb&w=2000")`}}
                            ></div>
                            <h6 className={"text-sm font-medium text-dark-secondary dark:text-light-secondary"}>Manuth Lakdiw</h6>
                        </div>
                        <div className={"flex items-center gap-4 text-neutral-strong dark:text-neutral-medium text-sm"}>
                            <div className={"flex items-center gap-1"}>
                                <Calendar strokeWidth={2} size={17} />
                                <p>{formatDate("2025.12.06")}</p>
                            </div>
                            <div className={"flex items-center gap-1"}>
                                <Clock strokeWidth={2} size={17} />
                                <p>12</p>
                            </div>
                            <div className={"flex items-center gap-1"}>
                                <Heart strokeWidth={2} size={17} />
                                <p>120</p>
                            </div>
                        </div>
                    </motion.div>

                ))}
            </ResponsiveGrid>
        </motion.section>
    )
}
export default RecentArticleSec
