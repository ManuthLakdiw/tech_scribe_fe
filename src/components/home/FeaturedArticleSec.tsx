import {ArrowRight, Zap} from "lucide-react";
import ResponsiveGrid from "../ResponsiveGrid.tsx";
import ShowCaseBlogCard from "../ShowCaseBlogCard.tsx";
import {memo} from "react";
import { motion } from "framer-motion";

const FeaturedArticleSec = memo(() => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}

            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}

            transition={{ duration: 0.8, ease: "easeOut" }}

            viewport={{
                once: false,
                amount: 0.1
            }}
            className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary overflow-hidden theme-transition"}>
            <div className={"inline-flex items-center gap-2 py-1 px-3 rounded-lg border border-neutral-200 " +
                "text-dark-secondary font-secondary uppercase text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                <Zap strokeWidth={2} size={13} />
                <h3 className={"font-medium"}>featured</h3>
            </div>
            <div className={"flex flex-col gap-y-4 sm:flex-row sm:justify-between mb-12"}>
                <h2 className={"text-2xl sm:text-3xl font-bold dark:text-light-secondary"}>Featured Articles</h2>
                <div className={"flex items-center gap-2 font-secondary uppercase text-xs tracking-widest  " +
                    "sm:px-5 rounded-lg hover:bg-neutral-soft cursor-pointer transition-all duration-300 dark:text-light-secondary dark:hover:bg-overlay-light"}>
                    <p>view all</p>
                    <ArrowRight  strokeWidth={2} size={15} />
                </div>
            </div>
            <ResponsiveGrid defCols={1} mdCols={2} lgCols={3}  className={"gap-6"}>
                <ShowCaseBlogCard
                    title={"Microservices Architecture: Design Patterns"}
                    author={"Sarah Chen"}
                    description={"Master microservices architecture with proven design patterns. Learn about service discovery, API gateways"}
                    authorProfileImage={"https://img.freepik.com/free-vector/flat-style-woman-face_90220-2936.jpg?t=st=1764870677~exp=1764874277~hmac=3bff773dd8d4e6a2f66c0971adaa978f6a061ca775916491933a65b9112f90bb&w=2000"}
                    blogImage={"https://img.freepik.com/free-vector/data-network-illustration_24908-57783.jpg?t=st=1764859810~exp=1764863410~hmac=89e8bcbfb628ffac08387bba8bf4aea939fb9cc66c49df4fece36ef6baa2094f&w=1480"}
                    postedDate={"2025-02-20"}
                    readTime={130}
                    views={1223}
                    likes={14}
                />
                <ShowCaseBlogCard
                    title={"Docker for Developers: A Practical Guide"}
                    description={"Docker is a popular containerization technology that allows developers to package their applications into lightweight, portable, self-sufficient containers."}
                    author={"John Doe"}
                    authorProfileImage={"https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg"}
                    blogImage={"https://images.unsplash.com/photo-1595587637401-83ff822bd63e?q=80&w=901&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    postedDate={"2025-04-15"}
                    readTime={13}
                    views={8421}
                    likes={3299}
                />
                <ShowCaseBlogCard
                    title={"React Hooks: A Complete Guide"}
                    description={"React Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class."}
                    author={"Jane daniel"}
                    blogImage={"https://img.freepik.com/free-photo/side-shot-code-editor-using-react-js_181624-61842.jpg?t=st=1764877155~exp=1764880755~hmac=d415b7c215692ff9f5be31386777dee265e3f65cc4d924b76da9a23508cb5607&w=2000"}
                    postedDate={"2025-012-5"}
                    readTime={43}
                    views={950}
                    likes={190}
                />
            </ResponsiveGrid>
        </motion.section>
    )
})
export default FeaturedArticleSec
