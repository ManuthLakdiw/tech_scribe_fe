import {Bell, Palette, Shield, User,} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {useState} from "react";
import ProfileSettings from "@/components/settings/ProfileSettings.tsx";
import AppearanceSettings from "@/components/settings/AppearanceSettings.tsx";
import NotificationSettings from "@/components/settings/NotificationSettings.tsx";
import SecuritySettings from "@/components/settings/SecuritySettings.tsx";

const tabs = [
    {
        id: "profile",
        label: "Profile",
        icon: User
    },
    {
        id: "appearance",
        label: "Appearance",
        icon: Palette
    },
    {
        id: "notifications",
        label: "Notifications",
        icon: Bell
    },
    {
        id: "security",
        label: "Security",
        icon: Shield
    }

];

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState("profile");


    return (
        <section className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary theme-transition"}>
            <div className={"max-w-4xl mx-auto"}>
                <div>
                    <div className={"mb-8 mt-5"}>
                        <h1 className={"text-2xl md:text-3xl font-bold"}>Settings</h1>
                        <p className={"text-muted-foreground"}>Manage your account settings and preferences</p>
                    </div>
                    <div className={"flex flex-col gap-2 space-y-6"}>
                        <div className="bg-muted text-muted-foreground inline-flex h-9 w-full items-center justify-center rounded-lg p-[3px] mb-6">
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
                        <div>
                            <AnimatePresence mode="wait">
                                {activeTab === "profile" && (
                                    <ProfileSettings/>
                                )}
                                {activeTab === "appearance" && (
                                    <AppearanceSettings/>
                                )}
                                {activeTab === "notifications" && (
                                    <NotificationSettings/>
                                )}
                                {activeTab === "security" && (
                                    <SecuritySettings/>
                                )}

                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        )
}
export default SettingsPage
