import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowDownNarrowWide,
    Github,
    Linkedin,
    Twitter,
    Users,
    UserSearch,
    Star,
    UserPlus,
    UserCheck, UserMinus
} from "lucide-react";
import CustomSelect from "../CustomSelection.tsx";
import ResponsiveGrid from "../ResponsiveGrid.tsx";
import ReachedEndOfTheList from "../reachedEndOfTheList.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Tooltip from "../Tooltip.tsx";
import AuthorCardLoading from "../AuthorCardLoading.tsx";

interface Author {
    id: number;
    name: string;
    username: string;
    email: string;
    company: {
        catchPhrase: string;
    };
    authorProfileImage: string;
    isTopAuthor: boolean;
    isFollowing: boolean;
}


const FollowButton = ({ isFollowing, onToggle }: { isFollowing: boolean; onToggle: (e: React.MouseEvent) => void }) => {

    const [isHovered, setIsHovered] = useState(false);


    const [showSuccess, setShowSuccess] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        onToggle(e);

        if (!isFollowing) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 1500);
        }
    };

    const getButtonContent = () => {
        if (showSuccess) {
            return {
                text: "Added!",
                icon: UserCheck,
                style: "bg-emerald-500 text-white border-emerald-500"
            };
        }


        if (isFollowing) {
            if (isHovered) {
                return {
                    text: "Unfollow",
                    icon: UserMinus,
                    style: "bg-red-50 dark:bg-red-900/10 border border-red-500 text-red-500"
                };
            }
            return {
                text: "Following",
                icon: UserCheck,
                style: "bg-transparent border border-neutral-strong/20 text-neutral-strong dark:text-neutral-medium"
            };
        }

        return {
            text: "Follow",
            icon: UserPlus,
            style: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
        };
    };

    const content = getButtonContent();

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 
                flex items-center justify-center gap-2 overflow-hidden
                ${content.style}
            `}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={content.text}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                >
                    <content.icon size={16} />
                    <span>{content.text}</span>
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

const AuthorsSec = () => {
    const [data, setData] = useState<Author[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    const handleFollowToggle = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setData((prevData) =>
            prevData.map((author) => {
                if (author.id === id) {
                    return { ...author, isFollowing: !author.isFollowing };
                }
                return author;
            })
        );
    };

    useEffect(() => {
        if (!hasMore) return;

        axios.get(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=9`)
            .then((res) => {
                if (res.data.length === 0) {
                    setHasMore(false);
                    return;
                }
                const formattedData = res.data.map((author: any) => ({
                    ...author,
                    authorProfileImage: `https://picsum.photos/seed/${author.id}/800/600`,
                    isTopAuthor: author.id % 3 === 0,
                    isFollowing: false
                }));

                setData((prev) => [...prev, ...formattedData]);
            })
            .catch(err => console.error(err));

    }, [page]);

    useEffect(() => {
        if (inView && hasMore) {
            const timer = setTimeout(() => {
                setPage((prevPage) => prevPage + 1);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [inView, hasMore]);


    return (
        <section className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary theme-transition"}>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={"pt-15 lg:pt-6 flex flex-col items-center text-center mb-6"}>
                <div className={"inline-flex items-center gap-1.5 py-[0.2rem] px-2 rounded-lg border border-neutral-200 mb-4 " +
                    "text-dark-secondary font-secondary text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                    <Users size={12} />
                    <h3 className={"font-medium"}>Authors</h3>
                </div>
                <h2 className={"text-4xl md:text-5xl font-bold mb-4 dark:text-light-secondary"}>Our Authors</h2>
                <p className={"text-neutral-strong font-light text-sm sm:text-lg"}>Meet the talented developers and writers who contribute to TechScribe</p>
            </motion.div>

            {/* Filter Section */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={"sticky top-20 w-full z-10 bg-light-primary dark:bg-dark-primary py-4"}>
                <div className={"w-full flex flex-col sm:flex-row  gap-4"}>
                    <div className={"relative flex-1"}>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium">
                            <UserSearch strokeWidth={2} size={16} />
                        </div>
                        <input
                            placeholder={"Search authors"}
                            className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs"
                        />
                    </div>
                    <div className={"flex gap-4"}>
                        <CustomSelect
                            options={["All Authors", "Following", "Not Following", "Top Authors", "Friends"]}
                            onChange={(val) => console.log(val)}
                            className={"flex-1"}
                        />
                        <CustomSelect
                            icon={ArrowDownNarrowWide}
                            options={["Most Popular", "Newest First", "Most Active", "Name", "Most Liked"]}
                            onChange={(val) => console.log(val)}
                        />
                    </div>
                </div>
                <p className={"text-sm text-neutral-strong dark:text-neutral-medium mt-4"}>Showing {data.length} authors</p>
            </motion.div>

            <div className={"mt-5"}>
                <ResponsiveGrid defCols={1} mdCols={2} lgCols={3} className={"gap-6"}>
                    {data.map((item, index) => (
                        <motion.div
                            onClick={() => navigate(`/blogs/${item.id}`)}
                            className="cursor-pointer h-full"
                            key={`${item.id}-${index}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: (index % 9) * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -5, transition: { duration: 0.1, ease: "easeInOut" } }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                // Fixed: added 'h-full' to ensure cards are same height
                                className={"relative group w-full h-full flex flex-col bg-light-secondary dark:bg-dark-secondary rounded-xl border border-neutral-soft dark-border shadow-sm py-10 px-6 hover:shadow-lg"}
                            >

                                <div
                                    className={"w-24 h-24 rounded-full mx-auto mb-5 md:mb-6 ring-4 ring-dark-secondary/10 dark:ring-light-secondary/10 group-hover:ring-indigo-500/50 transition-all bg-cover bg-no-repeat relative shrink-0"}
                                    style={{
                                        backgroundImage: `url(${item.authorProfileImage})`
                                    }}>

                                    {item.isTopAuthor && (
                                        <Tooltip text={"Top Author"}>
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className={"absolute -top-1 right-0 bg-yellow-400 p-1.5 rounded-full shadow-lg border-2 border-light-secondary"}>
                                                <Star className={"w-3.5 h-3.5 text-light-secondary fill-current"} />
                                            </div>
                                        </Tooltip>
                                    )}

                                </div>

                                <h3 className="font-bold text-xl  group-hover:text-indigo-500 transition-colors text-dark-secondary text-center dark:text-light-secondary" >
                                    {item.name}
                                </h3>
                                <p className={"text-neutral-strong dark:text-neutral-medium mb-4 text-center text-[15px]"}>@{item.username}</p>

                                <div className={"font-secondary font-bold uppercase px-2.5 py-0.5 text-[10px] rounded-md shrink-0 bg-dark-secondary/5 tracking-widest w-fit mx-auto mb-2 dark:text-light-secondary dark:bg-overlay-light"}>
                                    admin
                                </div>

                                <p className={"text-neutral-strong line-clamp-2 text-center font-light dark:text-neutral-medium mb-6 break-words min-h-[3rem] text-sm"}>
                                    {item.company.catchPhrase}
                                </p>

                                <div className="mt-auto">
                                    <div className={"mb-6 pb-6 border-b border-neutral-soft dark-border"}>
                                        <FollowButton
                                            isFollowing={item.isFollowing}
                                            onToggle={(e) => handleFollowToggle(item.id, e)}
                                        />
                                    </div>

                                    <div className={"flex justify-center gap-3"}>
                                        <motion.div whileHover={{ scale: 1.05 }} className={"w-8.5 h-8.5 bg-dark-secondary/5 dark:bg-overlay-light rounded-full text-neutral-strong dark:text-neutral-medium hover:text-dark-secondary dark:hover:text-neutral-soft cursor-pointer transition-all duration-150 flex items-center justify-center"}>
                                            <Twitter size={15} />
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} className={"w-8.5 h-8.5 bg-dark-secondary/5 dark:bg-overlay-light rounded-full text-neutral-strong dark:text-neutral-medium hover:text-dark-secondary dark:hover:text-neutral-soft cursor-pointer transition-all duration-150 flex items-center justify-center"}>
                                            <Github size={15} />
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} className={"w-8.5 h-8.5 bg-dark-secondary/5 dark:bg-overlay-light rounded-full text-neutral-strong dark:text-neutral-medium hover:text-dark-secondary dark:hover:text-neutral-soft cursor-pointer transition-all duration-150 flex items-center justify-center"}>
                                            <Linkedin size={15} />
                                        </motion.div>
                                    </div>
                                </div>

                            </motion.div>
                        </motion.div>
                    ))}

                    {hasMore && (
                        <div ref={ref} className="col-span-1 md:col-span-2 lg:col-span-3 w-full flex justify-center py-4">
                            <AuthorCardLoading xs={1} md={2} lg={3} gap={6} numberOfCards={9} />
                        </div>
                    )}
                </ResponsiveGrid>
                {!hasMore && (
                    <ReachedEndOfTheList />
                )}
            </div>
        </section>
    )
}
export default AuthorsSec;