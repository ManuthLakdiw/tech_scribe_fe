import {AtSign, Camera, Image, Mail, Save, Trash2, Upload, User } from "lucide-react";
import { useState, useRef } from "react";
import ResponsiveGrid from "@/components/ResponsiveGrid.tsx";
import { motion } from "framer-motion";

const ProfileSettings = () => {
    const userShortName = "ML";
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("Platform administrator and tech enthusiast");

    const colorFromDb = "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500";
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null); // පෙන්නන්න විතරයි
    const [coverFile, setCoverFile] = useState<File | null>(null); // Backend එකට යවන්න (Real File)
    const coverInputRef = useRef<HTMLInputElement>(null);

    const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverFile(file);
            setCoverImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveCover = () => {
        setCoverFile(null);
        setCoverImagePreview(null);
        if (coverInputRef.current) coverInputRef.current.value = "";
    };

    const defaultProfileColor = "bg-gradient-to-br from-indigo-500 to-purple-600";
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null); // පෙන්නන්න
    const [profileFile, setProfileFile] = useState<File | null>(null); // Backend එකට යවන්න
    const [profileColor, setProfileColor] = useState(defaultProfileColor);
    const profileInputRef = useRef<HTMLInputElement>(null);

    const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileFile(file);
            setProfileImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveProfile = () => {
        setProfileFile(null);
        setProfileImagePreview(null);
        if (profileInputRef.current) profileInputRef.current.value = "";
    };

    const handleSubmit = () => {
        // const formData = {
        //     fullName: fullName,
        //     username: username,
        //     bio: bio,
        //
        //     // Cover Photo Logic
        //     coverPhoto: coverFile ? coverFile.name : "No New File (Keep Existing or Use Color)",
        //     coverColor: !coverFile ? colorFromDb : "Image Uploaded (Ignore Color)",
        //
        //     // Profile Photo Logic
        //     profilePhoto: profileFile ? profileFile.name : "No New File",
        //     profileColor: !profileFile ? profileColor : "Image Uploaded (Ignore Color)",
        //     initials: userShortName
        // };

        // For Real Backend (Use FormData if sending files)
        /*
        const data = new FormData();
        data.append("fullName", fullName);
        data.append("username", username);
        data.append("bio", bio);
        if(coverFile) data.append("coverImage", coverFile);
        if(profileFile) data.append("profileImage", profileFile);
        data.append("profileColor", profileColor);
        */

        console.log("--------------- SUBMITTING DATA ---------------");
        console.log("1. Text Data:", { fullName, username, bio });
        console.log("2. Cover Info:", coverFile ? `File: ${coverFile.name}` : `Color: ${colorFromDb}`);
        console.log("3. Profile Info:", profileFile ? `File: ${profileFile.name}` : `Initials: ${userShortName}, Color: ${profileColor}`);
        console.log("-----------------------------------------------");

        // alert("Check the console for the submitted data object!");
    };

    const profileColors = [
        "bg-gradient-to-br from-indigo-500 to-purple-600",
        "bg-gradient-to-br from-pink-500 to-rose-600",
        "bg-gradient-to-br from-emerald-500 to-teal-600",
        "bg-gradient-to-br from-orange-500 to-amber-600",
        "bg-gradient-to-br from-cyan-500 to-blue-600",
        "bg-gradient-to-br from-violet-500 to-fuchsia-600"
    ];

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20 ,
                scale: 0.9
            }}

            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}

            transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 12
            }}

            className={"flex-1 outline-none space-y-6"}>
            <div className={"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"}>
                <div className={"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6"}>
                    <div className={"leading-none font-semibold flex items-center gap-2"}>
                        <Image className={"w-5 h-5"} />
                        Cover Photo
                    </div>
                    <div className={"text-muted-foreground text-sm"}>
                        Upload a cover photo for your profile (recommended: 1200x300)
                    </div>
                </div>
                <div className={"px-6"}>
                    <div className={`relative h-32 md:h-48 rounded-lg overflow-hidden group cursor-pointer ${coverImagePreview ? "bg-gray-100" : colorFromDb}`}>
                        {coverImagePreview && (
                            <img src={coverImagePreview} alt="cover" className={"w-full h-full object-cover"} />
                        )}
                        <label htmlFor="cover-photo" className={"absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"}>
                            <div className={"text-white text-center"}>
                                <Camera className={"w-8 h-8 mx-auto mb-2"}/>
                                <p className={"text-sm"}>Click to upload cover photo</p>
                            </div>
                        </label>
                    </div>
                    <input id={"cover-photo"} accept="image/*" className="hidden" type="file" ref={coverInputRef} onChange={handleCoverUpload}/>
                    <button onClick={handleRemoveCover} className={"inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 mt-3 cursor-pointer"}>
                        <Trash2 className={"w-4 h-4 mr-2"} />
                        Remove Cover
                    </button>
                </div>
            </div>

            <div className={"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"}>
                <div className={"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6"}>
                    <div className={"leading-none font-semibold flex items-center gap-2"}>
                        <User className={"w-5 h-5"} />
                        Profile Photo
                    </div>
                    <div className={"text-muted-foreground text-sm"}>
                        Upload a profile photo or choose initials style
                    </div>
                </div>

                <div className={"px-6"}>
                    <div className={"flex flex-col sm:flex-row items-center gap-6"}>
                        <div className={"relative group"}>
                            <span className={"relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 md:w-32 md:h-32 ring-4 ring-accent"}>
                                {profileImagePreview ? (
                                    <img src={profileImagePreview} alt="profile" className="h-full w-full object-cover" />
                                ) : (
                                    <span className={`flex size-full items-center justify-center rounded-full text-white text-2xl md:text-3xl ${profileColor}`}>
                                        {userShortName}
                                    </span>
                                )}
                            </span>
                            <label htmlFor="profile-photo" className={"absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"}>
                                <Camera className={"w-8 h-8 text-white"}/>
                            </label>
                        </div>
                        <input id="profile-photo" accept="image/*" className="hidden" type="file" ref={profileInputRef} onChange={handleProfileUpload}/>

                        <div className={"flex-1 text-center sm:text-left"}>
                            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                                <label htmlFor="profile-photo" className={"inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md gap-1.5 px-3 cursor-pointer"}>
                                    <Upload className={"w-4 h-4 mr-2"} />
                                    Upload Photo
                                </label>
                                {profileImagePreview && (
                                    <button
                                        onClick={handleRemoveProfile}
                                        className={"inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 cursor-pointer text-red-500 hover:text-red-600"}
                                    >
                                        <Trash2 className={"w-4 h-4 mr-2"} />
                                        Remove
                                    </button>
                                )}
                            </div>
                            {!profileImagePreview && (
                                <div className={"mt-4"}>
                                    <p className={"text-sm text-muted-foreground mb-2"}>Or choose initials color:</p>
                                    <div className={"flex gap-2 justify-center sm:justify-start flex-wrap"}>
                                        {profileColors.map((color, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setProfileColor(color)}
                                                className={`w-8 h-8 rounded-full ${color} ${profileColor === color ? "ring-2 ring-offset-2 ring-indigo-500" : ""}`}
                                            ></button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Basic Info Section */}
            <div className={"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"}>
                <div className={"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6"}>
                    <div className={"leading-none font-semibold"}>Basic Information</div>
                    <div className={"text-muted-foreground text-sm"}>Update your personal information</div>
                </div>
                <div className={"px-6 space-y-4"}>
                    <ResponsiveGrid defCols={1} smCols={2}>
                        <div className={"flex flex-col gap-2"}>
                            <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Full Name</label>
                            <div className={"relative flex-1"}>
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><User strokeWidth={2} size={16} /></div>
                                <input
                                    required={true}
                                    name="fullname"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)} // State Update
                                    placeholder={"John Doe"}
                                    autoComplete="off"
                                    className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs" />
                            </div>
                        </div>
                        <div className={"flex flex-col gap-2"}>
                            <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Username</label>
                            <div className={"relative flex-1"}>
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><AtSign strokeWidth={2} size={16} /></div>
                                <input
                                    required={true}
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} // State Update
                                    placeholder={"johndoe"}
                                    autoComplete="off"
                                    className="w-full text-sm font-light border dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs" />
                            </div>
                        </div>
                    </ResponsiveGrid>

                    {/* Email (Read Only) */}
                    <div  className={"flex flex-col gap-2"}>
                        <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Email</label>
                        <div className={"relative flex-1"}>
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-strong dark:text-neutral-medium"><Mail strokeWidth={2} size={16} /></div>
                            <input
                                readOnly={true}
                                value={"you@example.com"}
                                className="w-full text-sm font-light border-none dark-border py-[0.47rem] pl-9 pr-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-0 focus:outline-neutral-strong/50 focus:ring-0 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs" />
                        </div>
                        <p className={"text-xs text-muted-foreground"}>Email cannot be changed</p>
                    </div>

                    <div className={"flex flex-col gap-2 mb-4"}>
                        <label className={"leading-none pointer-events-none text-sm text-dark-secondary dark:text-light-secondary"}>Bio</label>
                        <textarea
                            rows={2}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full text-sm font-light border dark-border py-[0.47rem] px-4 rounded-lg border-neutral-strong/20 bg-light-secondary dark:bg-overlay-light text-dark-secondary dark:text-light-secondary placeholder:text-neutral-strong placeholder-dark:text-neutral-medium dark:placeholder:text-neutral-medium focus:outline-1 focus:outline-neutral-strong/50 focus:ring-3 focus:ring-neutral-strong/30 dark:focus:ring-neutral-strong/60 focus:ring-offset-0 transition-all duration-300 ease-in-out shadow-xs"
                        />
                    </div>
                    <div className={"flex items-center gap-3 pt-4"}>
                        <span className={"inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 " +
                            "transition-[color,box-shadow] overflow-hidden border-transparent bg-secondary text-secondary-foreground capitalize"}>
                            admin
                        </span>
                        <span className={"text-sm text-muted-foreground"}>
                            Member since 1/1/2024
                        </span>
                    </div>

                </div>
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 text-light-secondary font-base dark:text-dark-secondary bg-dark-secondary dark:bg-light-secondary hover:bg-neutral-800 dark:hover:bg-neutral-soft/97 rounded-md px-8 py-2 text-sm flex items-center justify-center gap-2"
            >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
            </button>

        </motion.div>
    )
}
export default ProfileSettings;