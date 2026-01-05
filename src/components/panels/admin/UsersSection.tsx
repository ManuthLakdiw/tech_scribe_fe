import { motion } from "framer-motion";
import { Loader2, Search, UserX } from "lucide-react";
import CustomSelect from "@/components/CustomSelection.tsx";
import { cn } from "@/utils/cnUtil.ts";
import { Switch } from "@/components/ui/switch.tsx";
import { Link } from "react-router-dom";
import CustomPagination from "@/components/CustomPagination.tsx";
import { useEffect, useState } from "react";
import { ChartRadialStacked } from "@/components/ui/ChartRadialStacked.tsx";
import type { ChartConfig } from "@/components/ui/chart.tsx";
import { GenericRadialChart } from "@/components/ui/GenaricRadialChart.tsx";
import { getAllUsers, toggleUserStatus } from "@/services/auth.ts";
import { toast } from "sonner";

const chartData = [
    { role: "admin", count: 15, fill: "var(--color-admin)" },
    { role: "author", count: 45, fill: "var(--color-author)" },
    { role: "user", count: 250, fill: "var(--color-user)" }
]

const chartConfig = {
    count: { label: "Count" },
    admin: { label: "Admin", color: "var(--chart-5)" },
    author: { label: "Author", color: "var(--chart-3)" },
    user: { label: "User", color: "var(--chart-2)" },
} satisfies ChartConfig

interface UserData {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    profilePictureURL: string;
    roles: string[];
    isActive: boolean;
    createdAt: string;
}

const UsersSection = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const itemsPerPage = 5;
    const [usersCurrentPage, setUsersCurrentPage] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const result = await getAllUsers();
                setUsers(result.data);
            } catch (error) {
                toast.error("Failed to fetch users");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        setUsersCurrentPage(1);
    }, [searchTerm]);

    const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
        const updatedUsers = users.map(u =>
            u._id === userId ? { ...u, isActive: !currentStatus } : u
        );
        setUsers(updatedUsers);

        try {
            await toggleUserStatus(userId);
            toast.success(currentStatus ? "User Blocked" : "User Activated");
        } catch (error) {
            toast.error("Failed to update status");
            setUsers(users);
        }
    };

    const filteredUsers = users.filter(user =>
        (user.fullname?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (user.username?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    const usersLastIndex = usersCurrentPage * itemsPerPage;
    const usersFirstIndex = usersLastIndex - itemsPerPage;
    const currentUsers = filteredUsers.slice(usersFirstIndex, usersLastIndex);

    const formatDate = (date: string) => new Date(date).toISOString().split('T')[0];

    if (isLoading) {
        return <div className="flex justify-center p-10"><Loader2 className="animate-spin w-8 h-8 text-primary"/></div>;
    }

    return (
        <div className="flex flex-col gap-8">
            <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 px-6 shadow-sm"}
            >
                <div>
                    <div className={"flex flex-col md:flex-row items-center justify-between gap-5"}>
                        <p className={"leading-none font-semibold whitespace-nowrap"}>User Management</p>
                        {users.length > 0 && (
                            <div className={"flex flex-col sm:flex-row gap-4 w-full md:w-auto"}>
                                <div className={"relative w-full md:w-72"}>
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium">
                                        <Search strokeWidth={2} size={16} />
                                    </div>
                                    <input
                                        placeholder={"Search Users..."}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                    <CustomSelect
                                        placeholder={"All"}
                                        options={["All", "Users", "Authors", "Admins"]}
                                        onChange={(val) => console.log(val)}
                                        className={"shrink-0 w-full sm:w-auto"}
                                    />
                                    <CustomSelect
                                        placeholder={"All"}
                                        options={["All", "Active", "Inactive"]}
                                        onChange={(val) => console.log(val)}
                                        className={"shrink-0 w-full sm:w-auto"}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {filteredUsers.length > 0 ? (
                    <>
                        <div className={"relative w-full overflow-x-auto"}>
                            <table className={"w-full caption-bottom text-sm"}>
                                <thead className={"[&_tr]:border-b"}>
                                <tr className={"hover:bg-muted/50 border-b transition-colors"}>
                                    <th className={"h-10 px-2 text-left align-middle font-medium"}>Users</th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium"}>Email</th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium"}>Role</th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium"}>Status</th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium"}>Joined</th>
                                    <th className={"h-10 px-2 text-left align-middle font-medium"}>Actions</th>
                                </tr>
                                </thead>
                                <tbody className={"[&_tr:last-child]:border-0"}>
                                {currentUsers.map((user) => (
                                    <tr key={user._id} className={"hover:bg-muted/50 border-b transition-colors"}>
                                        <td className={"p-2 align-middle whitespace-nowrap"}>
                                            <div className={"flex items-center gap-3"}>
                                                    <span className={"relative flex size-8 shrink-0 overflow-hidden rounded-full w-8 h-8"}>
                                                        <img
                                                            src={user.profilePictureURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                                                            alt={user.fullname}
                                                            className={"aspect-square size-full object-cover"}
                                                        />
                                                    </span>
                                                <div>
                                                    <p className={"font-medium"}>{user.fullname}</p>
                                                    <p className={"text-xs text-muted-foreground"}>@{user.username}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={"p-2 align-middle whitespace-nowrap"}>{user.email}</td>
                                        <td className={"p-2 align-middle whitespace-nowrap"}>
                                                <span className={cn(
                                                    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit",
                                                    user.roles.includes("ADMIN") ? "bg-primary/10 text-primary" :
                                                        user.roles.includes("AUTHOR") ? "bg-secondary/10 text-secondary-foreground" : "text-foreground"
                                                )}>
                                                    {user.roles[0]}
                                                </span>
                                        </td>
                                        <td className={"p-2 align-middle whitespace-nowrap"}>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={user.isActive}
                                                    onCheckedChange={() => handleStatusToggle(user._id, user.isActive)}
                                                />
                                            </div>
                                        </td>
                                        <td className={"p-2 align-middle whitespace-nowrap"}>{formatDate(user.createdAt)}</td>
                                        <td className={"p-2 align-middle whitespace-nowrap"}>
                                            <Link to={`/admin/users/${user._id}`} className={"inline-flex h-8 px-3 rounded-md text-sm font-medium hover:bg-accent items-center"}>
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredUsers.length > itemsPerPage && (
                            <div className="flex justify-center mt-4">
                                <CustomPagination
                                    totalItems={filteredUsers.length}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={usersCurrentPage}
                                    onPageChange={setUsersCurrentPage}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className={"flex flex-col items-center p-12 text-neutral-strong dark:text-neutral-medium gap-3"}>
                        <UserX className={"w-12 h-12"} />
                        <p>No users found matching "{searchTerm}"</p>
                    </div>
                )}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={"flex flex-col sm:flex-row gap-8 w-full"}
            >
                <div className={"flex-1"}>
                    <GenericRadialChart
                        title={"User Distribution"}
                        description={"Active users by role"}
                        data={chartData} config={chartConfig}
                        valueKey={"count"}
                        labelKey={"role"}
                        trendText={"Total users increased by 5.2%"}
                        footerText="Showing total users based on their roles"
                    />
                </div>
                <div className={"flex-1"}>
                    <ChartRadialStacked/>
                </div>
            </motion.div>
        </div>
    )
}
export default UsersSection;