import {motion, type Variants} from "framer-motion";
import Particles from "../bitsComp/Particles.tsx";
import {ArrowRight, BookOpen, CodeXml, Eye, Sparkles, TrendingUp} from "lucide-react";
import {Cursor, useTypewriter} from "react-simple-typewriter";
import CountUp from "react-countup";
import {useState} from "react";


const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        }
    }
};

const itemVariants: Variants = {
    hidden: {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.95
    },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};



const HeroSec = () => {

    const [isCounterOn, setIsCounterOn] = useState(false);

    const [text] = useTypewriter({
        words: [
            "Exploring the universe of code, one article at a time...",
            "Learn from industry experts and grow your skills...",
            "Join thousands of developers sharing knowledge...",
            "Discover in-depth tutorials and best practices...",
        ],
        loop: true,
    })
    return (
        <motion.section
            initial={{
                opacity: 0,
                y: 50,
                scale: 0.9
            }}

            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
            }}

            transition={{
                duration: 0.6,
                ease: "easeOut"
            }}

            viewport={{
                once: false,
                amount: 0.3
            }}

            className={"w-full min-h-screen pt-20 bg-light-primary dark:bg-dark-primary relative overflow-hidden flex flex-col items-center justify-center theme-transition"}>
            <Particles
                particleCount={300}
                particleSpread={15}
                particleBaseSize={90}
                alphaParticles={true}
                moveParticlesOnHover={true}
                className="absolute w-full h-2/3 top-1/2 -translate-y-1/2"
            />
            <div className={`
                absolute top-0 w-80 h-70 md:w-90 md:h-80 lg:w-90 lg:h-90 bg-indigo-500/30 rounded-full  blur-[80px] dark:blur-[110px] 
                
                right-[-10%] left-auto

                md:right-auto md:left-1/2 md:-translate-x-1/2
          
                lg:left-[20%] lg:translate-x-0
            `}></div>


            <div className={`
                absolute bottom-0 w-75 h-75 md:w-75 md:h-75 lg:w-85 lg:h-85 bg-purple-500/30 rounded-full blur-[80px] dark:blur-[110px]

                left-[-10%] right-auto

                md:left-1/2 md:-translate-x-1/2

                lg:left-auto lg:right-[20%] lg:translate-x-0
            `}></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"

                className={"w-full h-full relative z-40 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col items-center gap-5"}>
                <motion.div
                    variants={itemVariants}
                    className={"inline-flex  gap-2 py-2 px-4 bg-light-secondary dark:bg-dark-secondary font-secondary uppercase text-xs text-center sm:items-center" +
                    " justify-center text-dark-secondary dark:text-light-secondary tracking-widest rounded-md"}
                >
                    <Sparkles strokeWidth={2} size={16} className={"text-indigo-500 animate-pulse"} />
                    <h3>Welcome to the future of technical writing</h3>

                </motion.div>
                <div
                    className={"text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mt-4 flex flex-col items-center gap-6 text-center"} >
                    <motion.h1
                        variants={itemVariants}
                        className={"text-dark-secondary dark:text-light-secondary"}>Where Developers</motion.h1>
                    <motion.h1
                        variants={itemVariants}
                        className={"w-fit py-1 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent"}>Share Knowledge</motion.h1>
                </div>
                <motion.p
                    variants={itemVariants}
                    className={"text-sm text-center sm:text-xl text-neutral-strong dark:text-neutral-medium font-light mt-3 min-h-[40px]"}>
                    {text }
                    <Cursor/>
                </motion.p>

                <div
                    className={"flex gap-4 mt-2 flex-wrap w-full justify-center"}>
                    <motion.div
                        variants={itemVariants}
                        className={"flex w-full sm:w-auto items-center justify-center gap-2  text-xs font-secondary uppercase tracking-wider font-medium text-light-secondary " +
                            "dark:text-dark-secondary font-bold bg-dark-secondary dark:bg-light-secondary px-6 py-3 " +
                            "rounded-full hover:bg-neutral-800 cursor-pointer tracking-widest dark:hover:bg-neutral-soft transition-all duration-300"}
                    >
                        <p>explore articles</p>
                        <ArrowRight  strokeWidth={2} size={17} />
                    </motion.div>
                    <motion.button
                        variants={itemVariants}
                        className={"text-xs w-full sm:w-auto font-secondary uppercase tracking-wider font-medium text-dark-secondary " +
                            "font-bold bg-light-secondary border-neutral-soft dark:bg-light-secondary px-6 py-3 " +
                            "rounded-full hover:bg-neutral-soft cursor-pointer tracking-widest shadow-sm transition-all duration-300 " +
                            "dark:bg-light-secondary/10 dark:text-light-secondary border border-[0.5px] " +
                            "dark:border-neutral-soft/40 transition-all duration-300 "}
                    >start writing</motion.button>
                </div>
                    <motion.div
                        onViewportEnter={() => setIsCounterOn(true)}
                        onViewportLeave={() => setIsCounterOn(false)}
                        className={"grid grid-cols-2 gap-8 gap-x-10 mt-7 sm:grid-cols-4 place-items-center"}>
                        <motion.div
                            variants={itemVariants}
                            className={"flex flex-col items-center gap-3 w-fit"}>
                            <div className={"w-[48px] h-[48px] bg-neutral-soft dark:bg-overlay-light rounded-full flex items-center justify-center text-indigo-500"}>
                                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className={"flex flex-col items-center gap-1 text-center min-w-[145px]"}>
                                <h3 className={"font-bold text-2xl md:text-4xl text-dark-secondary dark:text-light-secondary"}>
                                    {isCounterOn ? <CountUp start={0} end={12} duration={2} delay={0.5} separator="," /> : "0"}
                                </h3>
                                <h6 className={"text-xs sm:text-sm text-neutral-strong dark:text-neutral-medium"}>Articles Published</h6>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className={"flex flex-col items-center gap-3 w-fit"}>
                            <div className={"w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12  bg-neutral-soft dark:bg-overlay-light rounded-full flex items-center justify-center text-indigo-500"}>
                                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className={"flex flex-col items-center gap-1 text-center min-w-[145px]"}>
                                <h3 className={"font-bold text-2xl md:text-4xl text-dark-secondary dark:text-light-secondary"}>
                                    {isCounterOn ? <CountUp start={0} end={12000} duration={2} delay={0.5} separator="," /> : "0"}
                                    +
                                </h3>
                                <h6 className={"text-xs sm:text-sm text-neutral-strong dark:text-neutral-medium"}>Active Readers</h6>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className={"flex flex-col items-center gap-3 w-fit"}>
                            <div className={"w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12  bg-light-secondary dark:bg-overlay-light rounded-full flex items-center justify-center text-indigo-500"}>
                                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className={"flex flex-col items-center gap-1 text-center min-w-[145px]"}>
                                <h3 className={"font-bold text-2xl md:text-4xl text-dark-secondary dark:text-light-secondary"}>
                                    {isCounterOn ? <CountUp start={0} end={3} duration={2} delay={0.5} separator="," /> : "0"}
                                </h3>
                                <h6 className={"text-xs sm:text-sm text-neutral-strong dark:text-neutral-medium"}>Expert Authors</h6>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            className={"flex flex-col items-center gap-3 w-fit"}>
                            <div className={"w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12  bg-light-secondary dark:bg-overlay-light rounded-full flex items-center justify-center text-indigo-500"}>
                                <CodeXml className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className={"flex flex-col items-center gap-1 text-center min-w-[145px]"}>
                                <h3 className={"font-bold text-2xl md:text-4xl text-dark-secondary dark:text-light-secondary"}>
                                    {isCounterOn ? <CountUp start={0} end={8} duration={2} delay={0.5} separator="," /> : "0"}

                                </h3>
                                <h6 className={"text-xs sm:text-sm text-neutral-strong dark:text-neutral-medium"}>Categories</h6>
                            </div>
                        </motion.div>
                    </motion.div>
            </motion.div>

        </motion.section>
    )
}
export default HeroSec