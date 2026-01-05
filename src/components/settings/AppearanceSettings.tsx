import { motion } from "framer-motion"

const AppearanceSettings = () => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20 ,
                scale: 0.9
            }}

            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}

            transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 12
            }}

            className={"flex-1 outline-none"}>
            <div className={"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"}>
                <div className={"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6"}>
                    <div className={"leading-none font-semibold"}>
                        Appearance
                    </div>
                    <div className={"text-muted-foreground text-sm"}>
                        Customize how TechScribe looks for you
                    </div>
                </div>
                <div className={"px-6"}>
                    <p className={"text-muted-foreground"}>
                        Theme settings are available in the navbar. Click the sun/moon icon to toggle between light and dark mode.
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
export default AppearanceSettings
