import ResponsiveGrid from "../ResponsiveGrid.tsx";
import CountUp from "react-countup";
import {
    Award,
    BookOpen, ChartCandlestick,
    CodeXml,
    Eye,
    Globe,
    Heart,
    Lightbulb, Pin,
    Rocket, ScanQrCode,
    Shield,
    Target,
    Users,
    Zap
} from "lucide-react";
import {motion, type Variants} from "framer-motion";


const features = [
    {
        icon: <CodeXml className="w-6 h-6 text-indigo-500" />,
        title: "Developer-First",
        desc: "Built by developers, for developers. Our platform understands your needs."
    },
    {
        icon: <Zap className="w-6 h-6 text-indigo-500" />,
        title: "Lightning Fast",
        desc: "Optimized for performance with modern web technologies."
    },
    {
        icon: <Shield className="w-6 h-6 text-indigo-500" />,
        title: "Secure & Private",
        desc: "Your data is protected with enterprise-grade security."
    },
    {
        icon: <Users className="w-6 h-6 text-indigo-500" />,
        title: "Community Driven",
        desc: "Join thousands of developers sharing knowledge."
    }
];

const values = [
    {
        icon: <Heart className="w-8 h-8 text-indigo-500 mb-3" />,
        title: "Passion",
        desc: "We love what we do and it shows in everything we create."
    },
    {
        icon: <Globe className="w-8 h-8 text-indigo-500 mb-3" />,
        title: "Accessibility",
        desc: "Knowledge should be accessible to everyone, everywhere."
    },
    {
        icon: <BookOpen className="w-8 h-8 text-indigo-500 mb-3" />,
        title: "Quality",
        desc: "We maintain high standards for all content on our platform."
    },
    {
        icon: <Award className="w-8 h-8 text-indigo-500 mb-3" />,
        title: "Excellence",
        desc: "We strive for excellence in every feature we build."
    }
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            delay: index * 0.15
        }
    })
};


const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        }
    }
};

const itemVariants: Variants = {
    hidden: {
        y: 20,
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




const AboutSection = () => {
    return (
        <section className={"w-full min-h-screen bg-light-primary dark:bg-dark-primary flex flex-col theme-transition"}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={"w-full pt-24"}>
                <div className={"w-full bg-gradient-to-b from-indigo-500/5 to-transparent relative"}>
                    <div className="container mx-auto px-4 py-14  lg:p-16 xl:p-20 flex flex-col items-center text-center">
                        <div className={"inline-flex items-center gap-1.5 py-[0.2rem] px-2 rounded-lg border border-neutral-200 mb-4 " +
                            "text-dark-secondary font-secondary text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                            <ScanQrCode size={12} />
                            <h3 className={"font-medium"}>About Us</h3>
                        </div>

                        <div className={"mb-6"}>
                            <motion.h1
                                variants={itemVariants}
                                className={"text-3xl sm:text-4xl md:text-6xl font-bold text-dark-secondary dark:text-light-secondary leading-none mb-1 sm:m-0"}>
                                Empowering Developers to
                            </motion.h1>
                            <motion.h1
                                variants={itemVariants}
                                className={"text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-gradient-start to-gradient-mid bg-clip-text text-transparent p-1 w-fit mx-auto"}>
                                Share Knowledge
                            </motion.h1>
                        </div>

                        <motion.p
                            variants={itemVariants}
                            className={"text-sm sm:text-base md:text-xl text-neutral-strong dark:text-neutral-medium mb-8 text-center max-w-3xl"}>
                            TechScribe is a modern platform built to help developers share their expertise, learn <br className="hidden md:block"/>
                            from peers, and grow together as a community.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className={"flex gap-4 flex-col sm:flex-row justify-center items-center w-full"}>
                            <button className={"block w-full sm:w-fit text-sm text-light-secondary dark:text-dark-secondary py-[0.65rem] px-5 rounded-lg " +
                                "bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 cursor-pointer transition-all duration-300 ease-in-out"}>
                                Join Our Community
                            </button>
                            <button className={"block w-full  sm:w-fit text-sm text-dark-secondary dark:text-light-secondary border border-neutral-soft dark-border shadow-xs py-[0.65rem] " +
                                "px-5 rounded-lg bg-light-secondary dark:bg-overlay-light hover:bg-neutral-soft/5 dark:hover:bg-white/8 cursor-pointer transition-all duration-300 ease-in-out"}>
                                Explore Articles
                            </button>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
            <div className={"w-full px-4 py-14 lg:p-16 bg-dark-secondary/1.5 dark:bg-dark-secondary/40"}>
                <ResponsiveGrid defCols={2} smCols={4} className={"gap-8 place-items-center"}>
                    <div>
                        <h3 className={"text-3xl md:text-4xl font-bold text-indigo-500 mb-2 text-center"}>
                            <CountUp start={0} end={12000} duration={2} separator="," />
                            +
                        </h3>
                        <p className={"text-sm md:text-base text-neutral-strong text-center"}>Active readers</p>
                    </div>
                    <div>
                        <h3 className={"text-3xl md:text-4xl font-bold text-indigo-500 mb-2 text-center"}>
                            <CountUp start={0} end={2000} duration={2} separator="," />
                            +
                        </h3>
                        <p className={"text-sm md:text-base text-neutral-strong text-center"}>Articles</p>
                    </div>
                    <div>
                        <h3 className={"text-3xl md:text-4xl font-bold text-indigo-500 mb-2 text-center"}>
                            <CountUp start={0} end={9} duration={2} separator="," />
                        </h3>
                        <p className={"text-sm md:text-base text-neutral-strong text-center"}>Categories</p>
                    </div>
                    <div>
                        <h3 className={"text-3xl md:text-4xl font-bold text-indigo-500 mb-2 text-center"}>
                            <CountUp start={0} end={99.5} duration={2} separator="," />
                        </h3>
                        <p className={"text-sm md:text-base text-neutral-strong text-center"}>Uptime</p>
                    </div>
                </ResponsiveGrid>
            </div>
           <div className={"w-full min-h-[50vh] px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary "}>
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}

                    whileInView={{
                        opacity: 1,
                        scale: 1
                    }}

                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                    className={"flex flex-col items-center justify-center mb-4"}>
                    <div className={"inline-flex items-center gap-1.5 py-[0.2rem] px-2 rounded-lg border border-neutral-200 mb-4 " +
                        "text-dark-secondary font-secondary text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                        <Pin size={12} />
                        <h3 className={"font-medium"}>Purpose</h3>
                    </div>
                    <h2 className={"text-2xl md:text-4xl font-bold mb-6 dark:text-light-secondary"}>Mission & Vision</h2>
                </motion.div>
               <div>
                   <ResponsiveGrid defCols={1} smCols={2} className={"gap-6 md:gap-8"}>
                       <motion.div
                           initial={{ opacity: 0, x: -100 }}

                           whileInView={{ opacity: 1, x: 0 }}

                           transition={{
                               duration: 0.5,
                               ease: "easeOut",
                           }}

                           viewport={{ once: true }}

                           className={"w-full min-h-[412px] rounded-xl shadow-sm bg-gradient-to-br from-indigo-500/5 dark:from-indigo-500/10 " +
                           "via-purple-500/5 dark:via-purple-500/10 to-transparent border border-indigo-500/20 py-6"}>
                           <div
                               className={"w-full h-full p-6 md:p-8"}>
                               <div className={"w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6"}>
                                   <Target className={"w-7 h-7 text-light-secondary"} />
                               </div>
                               <h3 className={"text-xl md:text-2xl font-bold mb-4 text-dark-secondary dark:text-light-secondary"}>Our Mission</h3>
                               <p className={"text-neutral-strong dark:text-neutral-medium leading-relaxed mb-4"}>
                                   To democratize technical knowledge by providing a platform where developers of all skill levels can share,
                                   learn, and grow together. We believe that every developer has unique insights worth sharing.
                               </p>
                               <div className={"flex items-center gap-2 mb-2"}>
                                   <Lightbulb className={"w-4 h-4 text-indigo-500"} />
                                   <p className={"text-sm text-neutral-strong dark:text-neutral-medium"}>Making technical knowledge accessible to all</p>
                               </div>
                               <div className={"flex items-center gap-2 mb-2"}>
                                   <Users className={"w-4 h-4 text-indigo-500"} />
                                   <p className={"text-sm text-neutral-strong dark:text-neutral-medium"}>Building a supportive community of learners</p>
                               </div>
                               <div className={"flex items-center gap-2"}>
                                   <BookOpen className={"w-4 h-4 text-indigo-500"} />
                                   <p className={"text-sm text-neutral-strong dark:text-neutral-medium"}>Curating high-quality educational content</p>
                               </div>
                           </div>

                       </motion.div>
                       <motion.div
                           initial={{ opacity: 0, x: 100 }}

                           whileInView={{ opacity: 1, x: 0 }}

                           transition={{
                               duration: 0.5,
                               ease: "easeOut",
                           }}

                           viewport={{ once: true }}
                           className={"w-full min-h-[412px] rounded-xl shadow-sm bg-gradient-to-br from-purple-500/5 dark:from-purple-500/10 " +
                           "via-pink-500/5 dark:via-pink-500/10 to-transparent border border-purple-500/20 py-6"}>
                           <div className={"w-full h-full p-6 md:p-8"}>
                               <div className={"w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6"}>
                                   <Eye className={"w-7 h-7 text-light-secondary"} />
                               </div>
                               <h3 className={"text-xl md:text-2xl font-bold mb-4 text-dark-secondary dark:text-light-secondary"}>Our vision</h3>
                               <p className={"text-neutral-strong dark:text-neutral-medium leading-relaxed mb-4"}>
                                   To become the world's most trusted platform for technical content, where developers naturally turn to share discoveries,
                                   learn cutting-edge technologies, and connect with like-minded professionals.
                               </p>
                               <div className={"flex items-center gap-2 mb-2"}>
                                   <Rocket className={"w-4 h-4 text-purple-500"} />
                                   <p className={"text-sm text-neutral-strong dark:text-neutral-medium"}>Leading innovation in technical education</p>
                               </div>
                               <div className={"flex items-center gap-2 mb-2"}>
                                   <Globe className={"w-4 h-4 text-purple-500"} />
                                   <p className={"text-sm text-neutral-strong dark:text-neutral-medium"}>Connecting developers across the globe</p>
                               </div>
                               <div className={"flex items-center gap-2"}>
                                   <Award className={"w-4 h-4 text-purple-500"} />
                                   <p className={"text-sm text-neutral-strong dark:text-neutral-medium"}>Setting the standard for quality tech content</p>
                               </div>
                           </div>
                       </motion.div>
                   </ResponsiveGrid>
               </div>
           </div>
            <div className={"w-full min-h-[25vh] px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-neutral-100 dark:bg-dark-secondary/40 overflow-hidden"}>
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}

                    whileInView={{
                        opacity: 1,
                        scale: 1
                    }}

                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                    className={"mb-12 w-full flex flex-col items-center text-center"}>
                    <div className={"inline-flex items-center gap-1.5 py-[0.2rem] px-2 rounded-lg border border-neutral-200 mb-4 " +
                        "text-dark-secondary font-secondary text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                        <Zap size={12} />
                        <h3 className={"font-medium"}>Features</h3>
                    </div>
                    <h2 className={"text-2xl md:text-4xl font-bold mb-4 dark:text-light-secondary"}>Why Choose TechScribe?</h2>
                    <p className={"text-neutral-strong font-light text-base md:text-lg text-center"}>We've built a platform that puts developers first,
                        with features designed to make <br/> technical writing and learning a breeze.</p>
                </motion.div>
                <div className={"mt-4"}>
                    <ResponsiveGrid defCols={1} smCols={2} lgCols={4} className={"gap-4 md:gap-6"}>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={cardVariants}
                                className={"w-full min-h-[258px] bg-light-secondary rounded-xl border border-neutral-soft" +
                                    " dark-border dark:bg-dark-secondary shadow-sm py-12 px-6 hover:shadow-lg transition-shadow duration-300 ease-in-out"}
                            >
                                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-dark-secondary dark:text-light-secondary">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-neutral-strong dark:text-neutral-medium">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </ResponsiveGrid>
                </div>
            </div>
            <div className={"w-full min-h-[25vh] px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary overflow-hidden"}>
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.8
                    }}

                    whileInView={{
                        opacity: 1,
                        scale: 1
                    }}

                    transition={{
                        duration: 0.5,
                        ease: "easeOut",
                    }}
                    className={"mb-12 w-full flex flex-col items-center text-center"}>
                    <div className={"inline-flex items-center gap-1.5 py-[0.2rem] px-2 rounded-lg border border-neutral-200 mb-4 " +
                        "text-dark-secondary font-secondary text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                        <ChartCandlestick size={12} />
                        <h3 className={"font-medium"}>Our Values</h3>
                    </div>
                    <h2 className={"text-2xl md:text-4xl font-bold mb-4 dark:text-light-secondary"}>What We Stand For</h2>
                </motion.div>
                <div>
                    <ResponsiveGrid defCols={1} smCols={2} lgCols={4} className={"gap-4 md:gap-6"}>
                        {values.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                custom={index}
                                viewport={{ once: true, margin: "-50px" }}
                                className={`
                                    w-full min-h-[214px] 
                                    bg-light-secondary dark:bg-dark-secondary 
                                    rounded-xl border border-neutral-soft dark:border-neutral-800
                                    flex flex-col items-center justify-center 
                                    shadow-sm py-12 px-6 
                                    hover:shadow-lg transition-shadow duration-300 ease-in-out
                                `}

                            >
                                {item.icon}

                                <h3 className="font-semibold mb-2 text-dark-secondary dark:text-light-secondary">
                                    {item.title}
                                </h3>

                                <p className="text-xs md:text-sm text-neutral-strong dark:text-neutral-medium text-center">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </ResponsiveGrid>
                </div>
            </div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={"w-full min-h-[25vh] px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-neutral-100 dark:bg-dark-secondary/40 overflow-hidden flex flex-col items-center justify-center"}>
                <motion.h2
                    variants={itemVariants}
                    className={"text-2xl md:text-4xl font-bold mb-6 text-dark-secondary dark:text-light-secondary text-center"}> Ready to Start Your Journey?</motion.h2>
                <motion.p
                    variants={itemVariants}
                    className={"text-base md:text-lg text-neutral-strong dark:text-neutral-medium mb-8 text-center"}>
                    Join thousands of developers who are already sharing and learning on TechScribe.
                </motion.p>
                <motion.div
                    variants={itemVariants}
                    className={"flex gap-4 flex-col sm:flex-row justify-center items-center w-full"}>
                    <button className={"block w-full sm:w-fit text-sm text-light-secondary dark:text-dark-secondary py-[0.65rem] px-5 rounded-lg " +
                        "bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 cursor-pointer transition-all duration-300 ease-in-out"}>
                        Create Free Account
                    </button>
                    <button className={"block w-full  sm:w-fit text-sm text-dark-secondary dark:text-light-secondary border border-neutral-soft dark-border shadow-xs py-[0.65rem] " +
                        "px-5 rounded-lg bg-light-secondary dark:bg-overlay-light hover:bg-neutral-soft/5 dark:hover:bg-white/8 cursor-pointer transition-all duration-300 ease-in-out"}>
                        Contact Us
                    </button>
                </motion.div>
            </motion.div>
            <div className={"w-full h-[70px] bg-light-primary dark:bg-dark-primary"}>

            </div>

        </section>
    )
}
export default AboutSection