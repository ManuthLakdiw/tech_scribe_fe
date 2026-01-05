import { Globe, Loader2 } from "lucide-react";
import DomeGallery from "../bitsComp/DomeGallery.tsx";
import useMediaQuery from "../../hooks/useMediaQuery.ts";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getCategoryCounts } from "@/services/blog.ts";

const CATEGORY_IMAGES = [
    {
        title: "AI & ML",
        slug: "ai-ml",
        src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=765&auto=format&fit=crop"
    },
    {
        title: "Web Development",
        slug: "web-development",
        src: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=764&auto=format&fit=crop"
    },
    {
        title: "Mobile Development",
        slug: "mobile-development",
        src: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1170&auto=format&fit=crop"
    },
    {
        title: "System Design",
        slug: "system-design",
        src: "https://plus.unsplash.com/premium_photo-1661575228451-9268e521c416?q=80&w=1170&auto=format&fit=crop"
    },
    {
        title: "DevOps",
        slug: "devops",
        src: "https://images.unsplash.com/photo-1599949104055-2d04026aee1e?q=80&w=1073&auto=format&fit=crop"
    },
    {
        title: "Backend Development",
        slug: "backend-development",
        src: "https://images.unsplash.com/photo-1630091693641-b7ea979cea64?q=80&w=1170&auto=format&fit=crop"
    },
    {
        title: "Frontend Development",
        slug: "frontend-development",
        src: "https://plus.unsplash.com/premium_photo-1675793715030-0584c8ec4a13?q=80&w=1074&auto=format&fit=crop"
    },
    {
        title: "Data Science",
        slug: "data-science",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop"
    },
    {
        title: "Database",
        slug: "database",
        src: "https://plus.unsplash.com/premium_photo-1664297989345-f4ff2063b212?q=80&w=1098&auto=format&fit=crop"
    }
];

const ExploreCategoriesSec = () => {
    const isMobile = useMediaQuery("(max-width: 425px)");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

    const [galleryItems, setGalleryItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch counts from backend
                const result = await getCategoryCounts();
                const counts = result.data; // e.g., { "AI & ML": 5, "Web Development": 10 }

                // 2. Merge static image data with dynamic counts
                const mergedData = CATEGORY_IMAGES.map(cat => ({
                    src: cat.src,
                    alt: cat.title, // Title acts as Alt text
                    navigatePath: `/categories/${cat.slug}`, // Construct URL
                    blogCount: counts[cat.title] || 0 // Use count from DB or default to 0
                }));

                setGalleryItems(mergedData);
            } catch (error) {
                console.error("Failed to load category data", error);
                // Fallback to 0 counts on error
                setGalleryItems(CATEGORY_IMAGES.map(cat => ({
                    src: cat.src,
                    alt: cat.title,
                    navigatePath: `/categories/${cat.slug}`,
                    blogCount: 0
                })));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-neutral-100 dark:bg-dark-secondary/40 overflow-hidden theme-transition"}>
            <div className={"mb-12 w-full flex flex-col items-center text-center"}>
                <div className={"inline-flex items-center gap-2 py-1 px-3 rounded-lg border border-neutral-200 mb-2 " +
                    "text-dark-secondary font-secondary uppercase text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                    <Globe strokeWidth={2} size={13} />
                    <h3 className={"font-medium"}>browse</h3>
                </div>
                <h2 className={"text-2xl sm:text-3xl font-bold dark:text-light-secondary mb-4"}>Explore Categories</h2>
                <p className={"text-neutral-strong font-light text-sm sm:text-base"}>Dive into specialized topics curated for modern developers</p>

                <div ref={sectionRef} className={"mt-4 w-full h-[400px] sm:h-[500px] md:h-[600px] relative flex justify-center items-center"}>
                    {loading ? (
                        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                    ) : (
                        <DomeGallery
                            images={galleryItems}
                            grayscale={false}
                            overlayBlurColor={"transparent"}
                            minRadius={isMobile ? 400 : 600}
                            maxRadius={isMobile ? 450 : 800}
                            segments={isMobile ? 25 : 35}
                            openedImageWidth={isMobile ? "280px" : "400px"}
                            openedImageHeight={isMobile ? "300px" : "400px"}
                            autoSpin={isInView}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}
export default ExploreCategoriesSec;