import { motion } from "framer-motion";

const RouteLoading = () => {

    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            className="w-screen h-screen flex flex-col justify-center items-center gap-8 absolute top-0 left-0 bg-zinc-950/50 dark:bg-white/10">
            <div className="w-[70px] h-[70px] relative">
                <motion.div
                    className="w-[32px] h-[32px] absolute rounded-xl shadow-2xl"
                    style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 0 30px rgba(102, 126, 234, 0.6), 0 0 60px rgba(102, 126, 234, 0.3)"
                    }}
                    animate={{
                        x: [38, 38, 0, 0, 38],
                        y: [0, 38, 38, 0, 0],
                        scale: [1, 1.1, 1.1, 1.1, 1],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="w-[32px] h-[32px] absolute rounded-xl shadow-2xl"
                    style={{
                        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                        boxShadow: "0 0 30px rgba(240, 147, 251, 0.6), 0 0 60px rgba(240, 147, 251, 0.3)"
                    }}
                    animate={{
                        x: [0, 38, 38, 0, 0],
                        y: [0, 0, 38, 38, 0],
                        scale: [1, 1.1, 1.1, 1.1, 1],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{
                        duration: 2,
                        delay: 0.66,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="w-[32px] h-[32px] absolute rounded-xl shadow-2xl"
                    style={{
                        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                        boxShadow: "0 0 30px rgba(79, 172, 254, 0.6), 0 0 60px rgba(79, 172, 254, 0.3)"
                    }}
                    animate={{
                        x: [0, 0, 38, 38, 0],
                        y: [38, 0, 0, 38, 38],
                        scale: [1, 1.1, 1.1, 1.1, 1],
                        rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{
                        duration: 2,
                        delay: 1.33,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
            <div className="flex gap-2">
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1,
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className={"w-[10px] h-[10px] rounded-full"}

                    style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 0 30px rgba(102, 126, 234, 0.6), 0 0 60px rgba(102, 126, 234, 0.3)"
                    }}
                ></motion.div>
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1,
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        delay: 0.5,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className={"w-[10px] h-[10px] rounded-full"}

                    style={{
                        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                        boxShadow: "0 0 30px rgba(79, 172, 254, 0.6), 0 0 60px rgba(79, 172, 254, 0.3)"
                    }}

                ></motion.div>

                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1,
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        delay: 1,
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    className={"w-[10px] h-[10px] rounded-full"}

                    style={{
                        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                        boxShadow: "0 0 30px rgba(240, 147, 251, 0.6), 0 0 60px rgba(240, 147, 251, 0.3)"
                    }}
                ></motion.div>
            </div>
        </motion.div>
    );
};

export default RouteLoading;