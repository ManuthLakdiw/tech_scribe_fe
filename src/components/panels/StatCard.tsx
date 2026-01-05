import { motion } from "framer-motion";
import {useState} from "react";
import CountUp from "react-countup";

const StatCard = ({ item, index, isTime = false }: { item: any, index: number, isTime?: boolean }) => {
    const [isInView, setIsInView] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            onViewportEnter={() => setIsInView(true)}
            onViewportLeave={() => setIsInView(false)}

            className={"py-10 px-4 rounded-xl bg-light-secondary dark:bg-dark-secondary border border-neutral-soft dark-border shadow-sm"}
        >
            <div className={"flex items-center gap-2 mb-2"}>
                {item.icon}
                <p className={"font-light text-sm text-neutral-strong dark:text-neutral-medium"}>{item.title}</p>
            </div>
            <p className={"text-xl md:text-2xl font-bold"}>
                {isInView ? (
                    <CountUp
                        start={0}
                        end={item.value}
                        duration={2}
                        separator=","
                    />
                ) : "0"}
                {isTime && "min"}
            </p>
        </motion.div>
    );
};

export default StatCard;