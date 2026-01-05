import { BookOpen, Search } from "lucide-react";
import CustomSelect from "../CustomSelection.tsx";
import ResponsiveGrid from "../ResponsiveGrid.tsx";
import BlogCard from "./BlogCard.tsx";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CardLoading from "../CardLoading.tsx";
import { motion } from "framer-motion";
import ReachedEndOfTheList from "../reachedEndOfTheList.tsx";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "@/services/blog.ts";

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

interface BlogPost {
    _id: string;
    title: string;
    excerpt: string;
    slug: string;
    coverImage: string;
    createdAt: string;
    category: string;
    views: number;
    likes?: number;
    author: {
        fullname: string;
        username: string;
        profilePictureURL: string;
    };
}

const BlogSection = () => {
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Articles");
    const [sort, setSort] = useState("Latest");

    const debouncedSearch = useDebounce(search, 500);
    const { ref, inView } = useInView({ threshold: 0.1 });

    useEffect(() => {
        setBlogs([]);
        setPage(1);
        setHasMore(true);
        fetchBlogs(1, true);
    }, [debouncedSearch, category, sort]);

    useEffect(() => {
        if (inView && hasMore && !isLoading && page > 1) {
            fetchBlogs(page, false);
        }
    }, [inView]);

    const fetchBlogs = async (currentPage: number, isReset: boolean) => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await getAllBlogs(currentPage, 9, debouncedSearch, category, sort);

            if (isReset) {
                setBlogs(response.data);
            } else {
                setBlogs(prev => [...prev, ...response.data]);
            }

            setHasMore(response.pagination.hasMore);

            if (response.pagination.hasMore) {
                setPage(prev => prev + 1);
            }

        } catch (error) {
            console.error("Failed to fetch blogs", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary theme-transition"}>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={"pt-15 lg:pt-6 flex flex-col items-center text-center mb-6"}>
                <div className={"inline-flex items-center gap-1.5 py-[0.2rem] px-2 rounded-lg border border-neutral-200 mb-4 " +
                    "text-dark-secondary font-secondary text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                    <BookOpen size={12} />
                    <h3 className={"font-medium"}>Blog</h3>
                </div>
                <h2 className={"text-4xl md:text-5xl font-bold mb-4 dark:text-light-secondary"}>All Articles</h2>
                <p className={"text-neutral-strong font-light text-sm sm:text-lg"}>Explore in-depth tutorials, guides, and insights from our community of developers</p>
            </motion.div>

            <motion.div
                className={"sticky top-20 w-full z-10 bg-light-primary dark:bg-dark-primary py-4"}>
                <div className={"w-full flex flex-col sm:flex-row gap-4"}>
                    <div className={"relative flex-1"}>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium">
                            <Search strokeWidth={2} size={16} />
                        </div>
                        <input
                            placeholder={"Search articles..."}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs"
                        />
                    </div>
                    <div className={"flex gap-4"}>
                        <CustomSelect
                            options={["All Articles", "Web Development", "Mobile Development", "AI&ML", "DevOps", "Database"]}
                            onChange={(val) => setCategory(val)}
                            value={category}
                            className={"flex-1"}
                        />
                        <CustomSelect
                            isShowIcon={false}
                            options={["Latest", "Most Viewed", "Most Liked"]}
                            onChange={(val) => setSort(val)}
                            value={sort}
                        />
                    </div>
                </div>
                <p className={"text-sm text-neutral-strong dark:text-neutral-medium mt-4"}>
                    Showing {blogs.length} articles
                </p>
            </motion.div>

            <div className={"mt-5"}>
                <ResponsiveGrid defCols={1} mdCols={2} lgCols={3} className={"gap-6"}>
                    {blogs.map((item, index) => (
                        <motion.div
                            key={`${item._id}-${index}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: (index % 9) * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            onClick={() => navigate(`/blogs/${item.slug}`)}
                        >
                            <BlogCard
                                title={item.title}
                                description={item.excerpt}
                                blogImage={item.coverImage}
                                postedDate={item.createdAt}
                                readTime={5}
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
                        No articles found matching your criteria.
                    </div>
                )}
            </div>
        </section>
    )
}
export default BlogSection;