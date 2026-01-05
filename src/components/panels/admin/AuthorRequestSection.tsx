import { AnimatePresence, motion } from "framer-motion";
import { AudioLines, Search, Loader2 } from "lucide-react";
import { cn } from "@/utils/cnUtil.ts";
import CustomPagination from "@/components/CustomPagination.tsx";
import { useEffect, useState } from "react";
import type { ChartConfig } from "@/components/ui/chart.tsx";
import { GenericRadialChart } from "@/components/ui/GenaricRadialChart.tsx";
import ReviewAuthorRequestPopUp from "@/components/panels/admin/ReviewAuthorRequestPopUp.tsx";
import {type AuthorRequestData, getAuthorRequests, updateAuthorRequestStatus } from "@/services/auth.ts";
import { toast } from "sonner";

const requestConfig = {
    count: { label: "Requests" },
    approved: { label: "Approved", color: "var(--chart-2)" },
    pending: { label: "Pending", color: "var(--chart-3)" },
    rejected: { label: "Rejected", color: "var(--chart-5)" },
} satisfies ChartConfig;

const AuthorRequestsSection = () => {
    const [requests, setRequests] = useState<AuthorRequestData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState<AuthorRequestData | null>(null);
    const [isShowPopUp, setIsShowPopUp] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setIsLoading(true);
                const result = await getAuthorRequests();
                setRequests(result.data);
            } catch (error) {
                toast.error("Failed to load requests");
            } finally {
                setIsLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        try {
            await updateAuthorRequestStatus(id, status);
            setRequests(prev => prev.map(req => req._id === id ? { ...req, status } : req));
            toast.success(`Request ${status.toLowerCase()}`);
        } catch (error) {
            toast.error("Action failed");
        }
    };

    const openReviewModal = (request: AuthorRequestData) => {
        setSelectedRequest(request);
        setIsShowPopUp(true);
    };

    const filteredRequests = requests.filter(req =>
        req.user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentRequests = filteredRequests.slice(firstIndex, lastIndex);

    const formatDate = (date: string) => new Date(date).toLocaleDateString();

    const chartData = [
        { status: "approved", count: requests.filter(r => r.status === 'APPROVED').length, fill: "var(--color-approved)" },
        { status: "pending", count: requests.filter(r => r.status === 'PENDING').length, fill: "var(--color-pending)" },
        { status: "rejected", count: requests.filter(r => r.status === 'REJECTED').length, fill: "var(--color-rejected)" }
    ];

    if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin w-8 h-8 text-primary"/></div>;

    return (
        <>
            <AnimatePresence>
                {isShowPopUp && selectedRequest && (
                    <ReviewAuthorRequestPopUp
                        setIsOpen={setIsShowPopUp}
                        request={selectedRequest}
                        onAction={handleAction}
                    />
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-8">
                <motion.div
                    key="requests"
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    className={"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 px-6 shadow-sm"}
                >
                    <div>
                        <div className={"flex flex-col md:flex-row items-center justify-between gap-5"}>
                            <p className={"leading-none font-semibold whitespace-nowrap"}>Author Requests</p>
                            {requests.length !== 0 && (
                                <div className={"flex flex-col sm:flex-row gap-4 w-full md:w-auto"}>
                                    <div className={"relative w-full md:w-72"}>
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium">
                                            <Search strokeWidth={2} size={16}/>
                                        </div>
                                        <input
                                            placeholder={"Search requests..."}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs"
                                        />
                                    </div>
                                    {/* Selectors can be implemented similarly with filtering logic */}
                                </div>
                            )}
                        </div>
                    </div>

                    {filteredRequests.length !== 0 ? (
                        <>
                            <div className={"relative w-full overflow-x-auto"}>
                                <table className={"w-full caption-bottom text-sm"}>
                                    <thead className={"[&_tr]:border-b"}>
                                    <tr className={"hover:bg-muted/50 border-b transition-colors"}>
                                        <th className={"h-10 px-2 text-left font-medium"}>User</th>
                                        <th className={"h-10 px-2 text-left font-medium"}>Reason</th>
                                        <th className={"h-10 px-2 text-left font-medium"}>Status</th>
                                        <th className={"h-10 px-2 text-left font-medium"}>Date</th>
                                        <th className={"h-10 px-2 text-left font-medium"}>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className={"[&_tr:last-child]:border-0"}>
                                    {currentRequests.map((req) => (
                                        <motion.tr
                                            key={req._id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="hover:bg-muted/50 border-b transition-colors"
                                        >
                                            <td className={"p-2 align-middle whitespace-nowrap"}>
                                                <div className={"flex items-center gap-3"}>
                                                    <span className={"relative flex size-8 shrink-0 overflow-hidden rounded-full"}>
                                                        <img src={req.user.profilePictureURL || `https://api.dicebear.com/7.x/initials/svg?seed=${req.user.username}`} alt={req.user.fullname} className={"aspect-square size-full object-cover"}/>
                                                    </span>
                                                    <div>
                                                        <p className={"font-medium"}>{req.user.fullname}</p>
                                                        <p className={"text-xs text-muted-foreground"}>@{req.user.username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={"p-2 align-middle max-w-[200px] truncate"}>{req.reason}</td>
                                            <td className={"p-2 align-middle"}>
                                                <span className={cn(
                                                    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit",
                                                    {
                                                        "bg-green-100 text-green-700 border-green-200": req.status === "APPROVED",
                                                        "bg-yellow-100 text-yellow-700 border-yellow-200": req.status === "PENDING",
                                                        "bg-red-100 text-red-700 border-red-200": req.status === "REJECTED"
                                                    }
                                                )}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className={"p-2 align-middle"}>{formatDate(req.createdAt)}</td>
                                            <td className={"p-2 align-middle"}>
                                                {req.status === 'PENDING' && (
                                                    <button onClick={() => openReviewModal(req)} className={"inline-flex h-8 px-3 rounded-md text-sm font-medium hover:bg-accent items-center border border-border transition-colors"}>
                                                        Review
                                                    </button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-center mt-4">
                                <CustomPagination
                                    totalItems={filteredRequests.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </>
                    ) : (
                        <div className={"flex flex-col items-center p-12 text-neutral-strong dark:text-neutral-medium gap-3"}>
                            <AudioLines className={"w-12 h-12"} />
                            <p>No requests found</p>
                        </div>
                    )}
                </motion.div>

                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className={"flex gap-8 w-full"}>
                    <div className={"flex-1"}>
                        <GenericRadialChart
                            title="Author Requests"
                            description="Current application status"
                            data={chartData}
                            config={requestConfig}
                            valueKey="count"
                            labelKey="status"
                            trendText="Status distribution"
                            footerText="Total requests overview"
                        />
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default AuthorRequestsSection;