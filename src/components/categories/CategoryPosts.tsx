import {useNavigate, useParams} from "react-router-dom";
import {
    Brain, Globe, LayoutTemplate, Smartphone, Infinity, Server,
    AppWindowMac, ChartNoAxesCombined, Database, ArrowLeft
} from "lucide-react";
import ResponsiveGrid from "../ResponsiveGrid.tsx";
import {motion, useMotionValueEvent, useScroll, useSpring, useTransform} from "framer-motion";
import BlogCard from "../blogs/BlogCard.tsx";
import CardLoading from "../CardLoading.tsx";
import ReachedEndOfTheList from "../reachedEndOfTheList.tsx";
import {useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {cn} from "../../utils/cnUtil.ts";
import {getBlogsByCategory} from "@/services/blog.ts";

// Metadata for Header (Icon & Description)
const categoriesMeta = [
    { title: "AI & ML", slug: "ai-ml", description: "Explore the future with Artificial Intelligence.", icon: <Brain className={"text-indigo-500 w-8 h-8 md:w-10 md:h-10"} /> },
    { title: "Web Development", slug: "web-development", description: "Master modern web technologies.", icon: <Globe className={"text-indigo-500 w-8 h-8 md:w-10 md:h-10"} /> },
    // ... add other categories meta here
    { title: "Mobile Development", slug: "mobile-development", description: "Build cross-platform apps.", icon: <Smartphone className={"text-indigo-500 w-8 h-8 md:w-10 md:h-10"} /> },
    { title: "System Design", slug: "system-design", description: "Learn scalable systems.", icon: <LayoutTemplate className={"text-indigo-500 w-8 h-8 md:w-10 md:h-10"} /> },
    { title: "DevOps", slug: "devops", description: "Automate workflows.", icon: <Infinity className={"text-indigo-500 w-8 h-8 md:w-10 md:h-10"} /> },
    { title: "Backend Development", slug: "backend-development", description: "Server-side programming.", icon: <Server className={"text-indigo-500 w-8 h-8 md:w-10 md:h-10"} /> },
    { title: "Frontend Development", slug: "frontend-development", description: "Beautiful user interfaces.", icon: <AppWindowMac className={"text-indigo-500 w-8 h-8 md:w-10 md:h-10"} /> },
    { title: "Data Science", slug: "data-science", description: "Data analysis & models.", icon: <ChartNoAxesCombined className={"text-indigo-500 w-8 h-8 md:w-10 md:h-10"} /> },
    { title: "Database", slug: "database", description: "Master SQL & NoSQL.", icon: <Database className={"text-indigo-500 w-8 h-8 md:w-10 md:h-10"} /> }
];

const CategoryPosts = () => {
    const navigate = useNavigate();
    const { categoryName } = useParams(); // URL slug (e.g., 'web-development')

    const [blogs, setBlogs] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const { scrollY } = useScroll();
    const [btnText, setBtnText] = useState("Back to Categories");

    // Scroll Animations
    const backBtnY = useSpring(useTransform(scrollY, [0, 400], [0, window.innerHeight * 0.5]), { stiffness: 100, damping: 30 });
    const backBtnX = useSpring(useTransform(scrollY, [0, 400], [0, window.innerWidth * 0.86]), { stiffness: 100, damping: 30 });
    const backBtnScale = useTransform(scrollY, [0, 200, 400], [1, 0.9, 0.8]);
    const backBtnOpacity = useTransform(scrollY, [0, 50], [1, 0.95]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest >= 5) { setBtnText(""); setIsFixed(true); }
        else { setBtnText("Back to Categories"); setIsFixed(false); }
    });

    const { ref, inView } = useInView({ threshold: 0.5 });

    // Find category metadata
    const categoryMeta = categoriesMeta.find((item) => item.slug === categoryName);

    // Fetch Logic
    useEffect(() => {
        if (!categoryName) return;

        const fetchBlogs = async () => {
            if (isLoading) return;
            setIsLoading(true);
            try {
                // Pass categoryName (slug) to backend
                const result = await getBlogsByCategory(categoryName, page);

                if (page === 1) {
                    setBlogs(result.data);
                } else {
                    setBlogs(prev => [...prev, ...result.data]);
                }

                setTotalCount(result.pagination.total);
                setHasMore(result.pagination.hasMore);

            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, [page, categoryName]);

    // Infinite Scroll
    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            setPage(prev => prev + 1);
        }
    }, [inView]);

    if (!categoryMeta) return <div className="text-center mt-20">Category Not Found</div>;

    return (
        <section className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary relative theme-transition"}>
            <div className={"pt-15 lg:pt-6 mb-12 relative"}>
                <motion.button
                    style={{ y: backBtnY, x: backBtnX, scale: backBtnScale, opacity: backBtnOpacity }}
                    onClick={() => navigate("/categories")}
                    className={cn(
                        "fixed z-50 mb-8 flex items-center gap-2 cursor-pointer text-sm font-medium transition-colors duration-300 ease-in-out",
                        !isFixed && "px-4 py-2 rounded-md text-dark-secondary dark:text-light-secondary hover:bg-dark-secondary/5 dark:hover:bg-overlay-light",
                        isFixed && "p-4 rounded-full shadow-xl bg-dark-secondary dark:bg-light-secondary text-light-secondary dark:text-dark-secondary hover:bg-neutral-800 dark:hover:bg-neutral-200"
                    )}
                >
                    <ArrowLeft className={"w-4 h-4"} strokeWidth={isFixed ? 3 : 2} />
                    {btnText}
                </motion.button>

                <div className={"flex items-start gap-4 mb-4 mt-16"}>
                    <div className={"w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0"}>
                        {categoryMeta.icon}
                    </div>
                    <div>
                        <h2 className={"text-2xl md:text-4xl font-bold text-dark-secondary dark:text-light-secondary"}>{categoryMeta.title}</h2>
                        <p className={"text-neutral-strong dark:text-neutral-medium font-light"}>{totalCount} Articles</p>
                    </div>
                </div>
                <p className={"text-neutral-strong font-light text-sm sm:text-base md:text-lg"}>{categoryMeta.description}</p>
            </div>

            <div>
                <ResponsiveGrid defCols={1} mdCols={2} lgCols={3} className={"gap-6"}>
                    {blogs.map((item, index) => (
                        <motion.div
                            key={`${item._id}-${index}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: (index % 9) * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            onClick={() => navigate(`/blogs/${item.slug}`)} // Click to view
                        >
                            <BlogCard
                                title={item.title}
                                description={item.excerpt}
                                blogImage={item.coverImage}
                                postedDate={item.createdAt}
                                readTime={5} // Optional: calc reading time
                                views={item.views}
                                likes={item.likes || 0}
                                category={item.category}
                            />
                        </motion.div>
                    ))}

                    {isLoading && (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 w-full flex justify-center py-4">
                            <CardLoading xs={1} md={2} lg={3} gap={6} numberOfCards={3} />
                        </div>
                    )}
                </ResponsiveGrid>

                {hasMore && !isLoading && <div ref={ref} className="h-10 w-full" />}
                {!hasMore && blogs.length > 0 && <ReachedEndOfTheList />}

                {!isLoading && blogs.length === 0 && (
                    <div className="text-center py-20 text-neutral-500">
                        No articles found in this category.
                    </div>
                )}
            </div>
        </section>
    )
}
export default CategoryPosts;