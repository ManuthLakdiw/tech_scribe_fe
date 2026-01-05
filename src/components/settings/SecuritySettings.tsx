import { motion } from "framer-motion"
import {Link} from "react-router-dom";

const SecuritySettings = () => {
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
                        Security
                    </div>
                    <div className={"text-muted-foreground text-sm"}>
                        Manage your account security
                    </div>
                </div>
                <div className={"px-6 space-y-4"}>
                    <h4 className={"font-medium mb-2"}>
                        Change Password
                    </h4>
                    <p className={"text-sm text-muted-foreground mb-4"}>
                        To change your password, please use the password reset feature.
                    </p>
                    <Link to={"/reset-password"} className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all " +
                        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2"}>
                        Reset Password
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
export default SecuritySettings
