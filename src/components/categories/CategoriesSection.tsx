import {motion} from "framer-motion";
import ResponsiveGrid from "../ResponsiveGrid.tsx";
import {
    Brain, Globe, LayoutTemplate, Smartphone, Infinity, Server,
    AppWindowMac, ChartNoAxesCombined, Database, ArrowRight, FolderSearch, Loader2
} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCategoryCounts} from "@/services/blog.ts";

// Static Data for Icons & Slugs (Counts will be updated from API)
const initialCategories = [
    { title: "AI & ML", slug: "ai-ml", icon: <Brain className={"text-indigo-500 w-7 h-7"} /> },
    { title: "Web Development", slug: "web-development", icon: <Globe className={"text-indigo-500 w-7 h-7"} /> },
    { title: "Mobile Development", slug: "mobile-development", icon: <Smartphone className={"text-indigo-500 w-7 h-7"} /> },
    { title: "System Design", slug: "system-design", icon: <LayoutTemplate className={"text-indigo-500 w-7 h-7"} /> },
    { title: "DevOps", slug: "devops", icon: <Infinity className={"text-indigo-500 w-7 h-7"} /> },
    { title: "Backend Development", slug: "backend-development", icon: <Server className={"text-indigo-500 w-7 h-7"} /> },
    { title: "Frontend Development", slug: "frontend-development", icon: <AppWindowMac className={"text-indigo-500 w-7 h-7"} /> },
    { title: "Data Science", slug: "data-science", icon: <ChartNoAxesCombined className={"text-indigo-500 w-7 h-7"} /> },
    { title: "Database", slug: "database", icon: <Database className={"text-indigo-500 w-7 h-7"} /> }
];

const CategoriesSection = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState(initialCategories.map(c => ({...c, count: 0})));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const result = await getCategoryCounts();
                const counts = result.data;

                const updated = initialCategories.map(cat => ({
                    ...cat,
                    count: counts[cat.title] || 0
                }));
                setCategories(updated);
            } catch (error) {
                console.error("Failed to load category counts");
            } finally {
                setLoading(false);
            }
        };
        fetchCounts();
    }, []);

    return (
        <section className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary theme-transition"}>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={"pt-15 lg:pt-6 flex flex-col items-center text-center mb-6"}>
                <div className={"inline-flex items-center gap-1.5 py-[0.2rem] px-2 rounded-lg border border-neutral-200 mb-4 " +
                    "text-dark-secondary font-secondary text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                    <FolderSearch size={12} />
                    <h3 className={"font-medium"}>Browse</h3>
                </div>
                <h2 className={"text-4xl md:text-5xl font-bold mb-4 dark:text-light-secondary"}>Categories</h2>
                <p className={"text-neutral-strong font-light text-sm sm:text-lg"}>Explore specialized topics curated for modern developers</p>
            </motion.div>

            {loading ? (
                <div className="flex justify-center mt-20"><Loader2 className="animate-spin text-primary w-8 h-8"/></div>
            ) : (
                <div className={"mt-10 md:mt-16"}>
                    <ResponsiveGrid defCols={1} mdCols={2} lgCols={4} gap={6}>
                        {categories.map((item, index) => (
                            <motion.div
                                onClick={() => navigate(`/categories/${item.slug}`)} // Slug එක හරහා යවන්න
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                whileHover={{ y: -5, transition: { duration: 0.1 } }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={"group w-full h-[306px] bg-light-secondary rounded-xl border border-neutral-soft shadow-sm py-14 px-8 dark-border dark:bg-dark-secondary hover:shadow-lg cursor-pointer"}
                            >
                                <div className={"w-13 h-14 mb-4 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-5"}>
                                    {item.icon}
                                </div>
                                <h1 className={"text-xl font-bold mb-2 text-dark-secondary dark:text-light-secondary group-hover:text-indigo-500 transition all duration-300"}>{item.title}</h1>
                                <p className={"text-sm text-neutral-strong dark:text-neutral-medium mb-4 line-clamp-2"}>
                                    Explore latest articles on {item.title}
                                </p>
                                <div className={"text-sm text-neutral-strong dark:text-neutral-medium flex items-center justify-between"}>
                                    <p>{item.count} articles</p>
                                    <ArrowRight strokeWidth={2} size={15} className={"group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300"} />
                                </div>
                            </motion.div>
                        ))}
                    </ResponsiveGrid>
                </div>
            )}
        </section>
    )
}
export default CategoriesSection;