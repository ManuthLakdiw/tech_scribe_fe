import {motion, type Variants} from "framer-motion"
import {
    Clock,
    Contact,
    Github,
    Linkedin,
    Mail,
    MapPin,
    MessageCircleQuestionMark,
    Phone,
    Send,
    Twitter
} from "lucide-react";
import ResponsiveGrid from "../ResponsiveGrid.tsx";


const details = [
    {
        title: "Email",
        value: "hello@techscribe.com",
        description: "Send us an email anytime",
        icon: <Mail className={"w-5 h-5 text-indigo-500"} />
    },
    {
        title: "Location",
        value: "Colombo, SriLanka",
        description: "Visit us at our office",
        icon: <MapPin className={"w-5 h-5 text-indigo-500"} />
    },
    {
        title: "Phone",
        value: "+94 77 777 7777",
        description: "Mon-Fri from 9am to 6pm",
        icon: <Phone className={"w-5 h-5 text-indigo-500"} />
    },
    {
        title: "Work Hours",
        value: "9:00 AM - 6:00 PM",
        description: "Pacific Time (PT)",
        icon: <Clock className={"w-5 h-5 text-indigo-500"} />
    }
]

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

const ContactSection = () => {
    return (
        <section className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary theme-transition"}>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.9
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut"
                }}
                className={"pt-15 lg:pt-6 flex flex-col items-center text-center mb-6"}>
                <div className={"inline-flex items-center gap-1.5 py-[0.2rem] px-2 rounded-lg border border-neutral-200 mb-4 " +
                    "text-dark-secondary font-secondary text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                    <Contact size={12} />
                    <h3 className={"font-medium"}>Contact Us</h3>
                </div>
                <h2 className={"text-4xl md:text-5xl font-bold mb-4 dark:text-light-secondary"}>Get in Touch</h2>
                <p className={"text-neutral-strong font-light text-sm sm:text-lg"}>Have a question or want to work together? We'd love to hear from you. Send us a
                    <br/>message and we'll respond as soon as possible.</p>
            </motion.div>
            <div className={"mt-10 md:mt-16"}>
                <div className="w-full flex flex-col lg:flex-row gap-8 items-start relative">

                    <div className="w-full lg:w-1/3 flex flex-col gap-8">
                        {details.map((item, index) => (
                            <motion.div
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                custom={index}
                                viewport={{ once: true, margin: "-50px" }}
                                key={index}
                                className={"w-full min-h-[170px] border border-neutral-soft dark-border rounded-xl" +
                                    " bg-light-secondary dark:bg-dark-secondary py-12 px-6 flex items-start gap-4 shadow-sm " +
                                    "hover:shadow-lg transition-shadow duration-300 ease-in-out"}
                            >
                                <div className={"w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0"}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className={"font-semibold mb-1 text-dark-secondary dark:text-light-secondary"}>{item.title}</h3>
                                    <p className={"text-dark-secondary dark:text-light-secondary font-light"}>{item.value}</p>
                                    <p className={"text-neutral-strong dark:text-neutral-medium text-sm"}>{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                        <motion.div
                            variants={cardVariants}
                                initial="hidden"
                            whileInView="visible"
                            custom={details.length}

                            className={"w-full min-h-[170px] border border-neutral-soft dark-border rounded-xl" +
                            " bg-light-secondary dark:bg-dark-secondary py-12 px-6  shadow-sm " +
                            "hover:shadow-lg transition-shadow duration-300 ease-in-out"}>
                            <h3 className={"font-semibold mb-4 text-dark-secondary dark:text-light-secondary"}>Follow Us</h3>
                            <div className={"flex gap-4"}>
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    className={"p-[0.7rem] bg-dark-secondary/5  dark:bg-overlay-light rounded-full text-neutral-strong" +
                                        " dark:text-neutral-medium hover:text-dark-secondary dark:hover:text-neutral-soft cursor-pointer" +
                                        " transition-all duration-150 flex items-center justify-center"}
                                >
                                    <Twitter size={18} />
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    className={"p-[0.7rem] bg-dark-secondary/5  dark:bg-overlay-light rounded-full text-neutral-strong" +
                                        " dark:text-neutral-medium hover:text-dark-secondary dark:hover:text-neutral-soft cursor-pointer" +
                                        " transition-all duration-150 flex items-center justify-center"}
                                >
                                    <Github size={18} />
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    className={"p-[0.7rem] bg-dark-secondary/5 dark:bg-overlay-light rounded-full text-neutral-strong" +
                                        " dark:text-neutral-medium hover:text-dark-secondary dark:hover:text-neutral-soft cursor-pointer" +
                                        " transition-all duration-150 flex items-center justify-center"}
                                >
                                    <Linkedin size={18} />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-2/3 sticky top-24">
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}

                            whileInView={{ opacity: 1, x: 0 }}

                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                            }}
                            className={"w-full min-h-[484px] border border-neutral-soft rounded-xl bg-light-secondary dark:bg-dark-secondary py-14 px-8 dark-border"}>
                            <h2 className={"text-2xl font-bold mb-6 text-dark-secondary dark:text-light-secondary"}>Send Us a Message</h2>
                            <div className={"mb-6"}>
                                <ResponsiveGrid defCols={1} mdCols={2}>
                                    <div className={"flex flex-col gap-2"}>
                                        <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Name</label>
                                        <input
                                            placeholder={"John Doe"}
                                            className="
                                            w-full
                                            text-sm
                                            font-light
                                            border dark-border py-[0.47rem] px-4 rounded-lg
                                            border-neutral-strong/20
                                            bg-light-secondary dark:bg-overlay-light
                                            text-dark-secondary dark:text-light-secondary
                                            placeholder:text-neutral-strong
                                            placeholder-dark:text-neutral-medium
                                            dark:placeholder:text-neutral-medium
                                            focus:outline-1
                                            focus:outline-neutral-strong/50
                                            focus:ring-3
                                            focus:ring-neutral-strong/30
                                            dark:focus:ring-neutral-strong/60
                                            focus:ring-offset-0
                                            transition-all duration-300 ease-in-out
                                            shadow-xs
                                            "
                                        />
                                    </div>
                                    <div className={"flex flex-col gap-2"}>
                                        <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Email</label>
                                        <input
                                            type={"email"}
                                            placeholder={"your@email.com"}
                                            className="
                                            w-full
                                            text-sm
                                            font-light
                                            border dark-border py-[0.47rem] px-4 rounded-lg
                                            border-neutral-strong/20
                                            bg-light-secondary dark:bg-overlay-light
                                            text-dark-secondary dark:text-light-secondary
                                            placeholder:text-neutral-strong
                                            placeholder-dark:text-neutral-medium
                                            dark:placeholder:text-neutral-medium
                                            focus:outline-1
                                            focus:outline-neutral-strong/50
                                            focus:ring-3
                                            focus:ring-neutral-strong/30
                                            dark:focus:ring-neutral-strong/60
                                            focus:ring-offset-0
                                            transition-all duration-300 ease-in-out
                                            shadow-xs
                                            "
                                        />
                                    </div>
                                </ResponsiveGrid>
                            </div>
                            <div className={"flex flex-col gap-2 mb-6"}>
                                <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Subject</label>
                                <input
                                    placeholder={"How can we help?"}
                                    className="
                                        w-full
                                        text-sm
                                        font-light
                                        border dark-border py-[0.47rem] px-4 rounded-lg
                                        border-neutral-strong/20
                                        bg-light-secondary dark:bg-overlay-light
                                        text-dark-secondary dark:text-light-secondary
                                        placeholder:text-neutral-strong
                                        placeholder-dark:text-neutral-medium
                                        dark:placeholder:text-neutral-medium
                                        focus:outline-1
                                        focus:outline-neutral-strong/50
                                        focus:ring-3
                                        focus:ring-neutral-strong/30
                                        dark:focus:ring-neutral-strong/60
                                        focus:ring-offset-0
                                        transition-all duration-300 ease-in-out
                                        shadow-xs
                                        "
                                />
                            </div>
                            <div className={"flex flex-col gap-2"}>
                                <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Message</label>
                                <textarea
                                    rows={6}
                                    placeholder={"Tell us more about your inquiry..."}
                                    className="
                                        w-full
                                        text-sm
                                        font-light
                                        border dark-border py-[0.47rem] px-4 rounded-lg
                                        border-neutral-strong/20
                                        bg-light-secondary dark:bg-overlay-light
                                        text-dark-secondary dark:text-light-secondary
                                        placeholder:text-neutral-strong
                                        placeholder-dark:text-neutral-medium
                                        dark:placeholder:text-neutral-medium
                                        focus:outline-1
                                        focus:outline-neutral-strong/50
                                        focus:ring-3
                                        focus:ring-neutral-strong/30
                                        dark:focus:ring-neutral-strong/60
                                        focus:ring-offset-0
                                        transition-all duration-300 ease-in-out
                                        shadow-xs
                                        "
                                />
                            </div>
                            <button className={"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium shadow-xs border-dark " +
                                "bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 h-10 rounded-md px-6 text-light-secondary" +
                                " dark:text-dark-secondary mt-6 cursor-pointer transition-colors duration-300 ease-in-out"}>
                                Send Message
                                <Send className={"ml-2 w-4 h-4"} />
                            </button>
                        </motion.div>
                    </div>
                </div>
                <div className={"w-full min-h-[50vh] px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary overflow-hidden"}>
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
                            <MessageCircleQuestionMark size={12} />
                            <h3 className={"font-medium"}>FAQ</h3>
                        </div>
                        <h2 className={"text-2xl md:text-4xl font-bold mb-4 dark:text-light-secondary"}>Frequently Asked Questions</h2>
                    </motion.div>
                    <div>
                        <ResponsiveGrid defCols={1} smCols={2} className={"gap-6 max-w-4xl mx-auto"}>
                            <div className={"w-full min-h-[178px] bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-sm border " +
                                "border-neutral-soft dark-border py-12 px-6"}>
                                <h5 className={"font-semibold mb-2 text-dark-secondary dark:text-light-secondary"}>Is TechScribe free to use?</h5>
                                <h6 className={"text-neutral-strong dark:text-neutral-medium"}>
                                    Yes! TechScribe is completely free for readers. Authors can also publish content for free.
                                </h6>
                            </div>
                            <div className={"w-full min-h-[178px] bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-sm border " +
                                "border-neutral-soft dark-border py-12 px-6"}>
                                <h5 className={"font-semibold mb-2 text-dark-secondary dark:text-light-secondary"}>Can I import my existing blog posts?</h5>
                                <h6 className={"text-neutral-strong dark:text-neutral-medium"}>
                                    Yes, we support importing content from various platforms. Contact our support team for assistance.
                                </h6>
                            </div>
                            <div className={"w-full min-h-[178px] bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-sm border " +
                                "border-neutral-soft dark-border py-12 px-6"}>
                                <h5 className={"font-semibold mb-2 text-dark-secondary dark:text-light-secondary"}>How do I become an author?</h5>
                                <h6 className={"text-neutral-strong dark:text-neutral-medium"}>
                                    You can apply to become an author through your profile settings. Our team will review your application and get back to you within 48 hours.
                                </h6>
                            </div>
                            <div className={"w-full min-h-[178px] bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-sm border " +
                                "border-neutral-soft dark-border py-12 px-6"}>
                                <h5 className={"font-semibold mb-2 text-dark-secondary dark:text-light-secondary"}>How do I report inappropriate content?</h5>
                                <h6 className={"text-neutral-strong dark:text-neutral-medium"}>
                                    You can report content using the flag button on any article or by contacting us directly.
                                </h6>
                            </div>
                        </ResponsiveGrid>
                    </div>
                </div>
            </div>

        </section>
    )
}
export default ContactSection
