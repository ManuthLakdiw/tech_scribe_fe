import {
    Clock,
    Eye,
    FileText,
    Heart,
    LogOut,
    Plus,
    Send,
    SquarePen,
    TrendingUp,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth.ts";
import ResponsiveGrid from "@/components/ResponsiveGrid.tsx";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cnUtil.ts";
import BlogPopUp from "@/components/BlogPopUp.tsx";
import StatCard from "@/components/panels/StatCard.tsx";
import MyPostsSection, { type BlogPost } from "@/components/panels/author/MyPostsSection.tsx";
import DraftSection from "@/components/panels/author/DraftSection.tsx";
import AnalyticsSection from "@/components/panels/author/AnalyticsSection.tsx";


const details = [
    {
        icon: <FileText className={"w-4 h-4 text-blue-500"} />,
        title: "Total Posts",
        value: 12
    },
    {
        icon: <Send className={"w-4 h-4 text-green-500"} />,
        title: "Published",
        value: 7
    },
    {
        icon: <SquarePen className={"w-4 h-4 text-yellow-500"} />,
        title: "Drafts",
        value: 5
    },
    {
        icon: <Eye className={"w-4 h-4 text-purple-500"} />,
        title: "Total Views",
        value: 9993
    },
    {
        icon: <Heart className={"w-4 h-4 text-red-500"} />,
        title: "Total Likes",
        value: 0
    },
]

const tabs = [
    {
        id: "posts",
        label: "My Posts",
        icon: FileText
    },
    {
        id: "drafts",
        label: "Drafts",
        icon: SquarePen
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: TrendingUp
    }
];

const AuthorDashBoard = () => {

    const { user, isLoading } = useAuth()
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("posts");
    const [isShowPopUp, setIsShowPopUp] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [postTrigger, setPostTrigger] = useState(0);

    useEffect(() => {
        if (!isLoading && !user) {
            navigate("/login");
        }
    }, [user, navigate]);


    if (!user) return null;

    return (
        <div>

            <AnimatePresence>
                {isShowPopUp && (
                    <BlogPopUp
                        key={selectedPost ? selectedPost._id : "new-post"}
                        setIsOpen={setIsShowPopUp}
                        initialData={selectedPost}
                        onPostSaved={() => setPostTrigger(prev => prev + 1)}
                    />
                )}
            </AnimatePresence>

            <div className={
                "fixed top-0 right-0 left-0 lg:left-64 z-40 " +
                "bg-light-primary/95 dark:bg-dark-primary/95 backdrop-blur-md " +
                "p-4 md:p-6 flex flex-col gap-4"
            }>

                <div className={"lg:hidden flex items-center justify-between w-full"}>
                    <h1 className={"font-bold text-xl w-fit bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent"}>
                        TechScribe
                    </h1>
                    <div className={"flex items-center gap-2"}>
                        <button className={"whitespace-nowrap text-sm font-medium rounded-md h-8 px-3 shadow-xs bg-light-secondary dark:bg-dark-secondary text-dark-secondary dark:text-light-secondary border border-neutral-soft dark-border"}>
                            Home
                        </button>
                        <button className={"whitespace-nowrap text-sm font-medium rounded-md h-8 px-3 shadow-xs bg-light-secondary dark:bg-dark-secondary text-dark-secondary dark:text-light-secondary border border-neutral-soft dark-border"}>
                            <LogOut className={"w-4 h-4"} />
                        </button>
                    </div>
                </div>


                <div className={"flex items-center justify-between w-full"}>
                    <div>
                        <h1 className={"text-2xl md:text-3xl font-bold text-dark-secondary dark:text-light-secondary"}>Author Dashboard</h1>
                        <p className={"text-neutral-strong dark:text-neutral-medium font-light text-sm"}>Manage your content</p>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedPost(null);
                            setIsShowPopUp(true);
                        }}
                        className={"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all " +
                            "bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 shadow-xs h-9 px-4 py-2 " +
                            "text-light-secondary dark:text-dark-secondary border border-neutral-soft dark-border"}>
                        <Plus className={"w-4 h-4 sm:mr-2"} />
                        <span className="hidden sm:inline">New Post</span>
                    </button>
                </div>

            </div>
            <div className={"pt-40 sm:pt-24"}>

                <div
                    className={"mb-8"}
                >
                    <ResponsiveGrid defCols={2} mdCols={3} lgCols={6} className={"gap-3"}>
                        {details.map((item, index) => (
                            <StatCard key={index} item={item} index={index} />
                        ))}
                        <StatCard
                            item={{
                                icon: <Clock className={"w-4 h-4 text-indigo-500"} />,
                                title: "Avg. Read Time",
                                value: 12
                            }}
                            index={details.length}
                            isTime={true}
                        />
                    </ResponsiveGrid>
                </div>

                <div className="bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center px-4 py-1 text-sm font-medium whitespace-nowrap gap-2 transition-colors 
                    
                         ${activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="active-tab-indicator"
                                    className="absolute inset-0 rounded-md border border-neutral-soft dark-border bg-light-primary dark:bg-white/4"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30
                                    }}
                                />
                            )}

                            <span className="relative z-10 flex items-center gap-2">
                                <tab.icon className="w-4 h-4" />
                                <span className={"hidden md:inline-block"}>{tab.label}</span>
                            </span>
                        </button>
                    ))}
                </div>

                <div className={cn(
                    "mt-2",
                    { "bg-card  text-card-foreground flex flex-col gap-6 rounded-xl border py-6 px-6 shadow-sm": activeTab === "posts" || activeTab === "drafts" }
                )}>
                    <AnimatePresence mode="wait">
                        {activeTab === "posts" && (
                            <MyPostsSection
                                setIsShowPopUp={setIsShowPopUp}
                                setSelectedPost={setSelectedPost}
                                postTrigger={postTrigger}
                                onRefresh={() => setPostTrigger(prev => prev + 1)}
                            />
                        )}

                        {activeTab === "drafts" && (
                            <DraftSection
                                setIsShowPopUp={setIsShowPopUp}
                                setSelectedPost={setSelectedPost}
                                postTrigger={postTrigger}
                                onRefresh={() => setPostTrigger(prev => prev + 1)}
                            />
                        )}

                        {activeTab === "analytics" && (
                            <AnalyticsSection />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
export default AuthorDashBoard;