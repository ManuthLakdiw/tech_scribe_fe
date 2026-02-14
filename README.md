# ✍️ TechScribe - Modern Technical Blogging Platform

**TechScribe** is a feature-rich, full-stack MERN (MongoDB, Express, React, Node.js) blogging platform tailored for the developer community. It empowers users to share knowledge through technical articles, supports role-based access (User, Author, Admin), and leverages AI for content creation.

> ### 🔗 **Project Links**
> 💻 **[Frontend Repository](https://github.com/ManuthLakdiw/tech_scribe_fe)** &nbsp; | &nbsp; ⚙️ **[Backend Repository](https://github.com/ManuthLakdiw/tech_scribe_be)** &nbsp;
---

## 🛠️ Technologies Used

### **Frontend**
- **Framework:** React.js (Vite) + TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (@use-gesture/react for 3D gallery)
- **Routing:** React Router DOM v6
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Markdown:** `react-markdown`, `rehype-highlight`, `remark-gfm`
- **UI Components:** Lucide React (Icons), Sonner (Toasts)

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens) & Cookies
- **File Storage:** Cloudinary (via Multer)
- **AI Integration:** Google Gemini API (Text), Pollinations.ai (Images)
- **Security:** Bcrypt.js, CORS, Helmet

---

## ✨ Key Features

### 🟢 For Readers (Users)
- **Authentication:** Secure Sign Up/Login with JWT.
- **Profile Management:** Update bio, change profile & cover photos.
- **Infinite Scrolling:** Seamless reading experience with optimized pagination.
- **Categorized Content:** Browse articles by tech stacks (Web Dev, AI, DevOps, etc.).
- **Interactions:** Like posts and comment system.
- **Become an Author:** Submit applications (with resume upload) to become a writer.

### 🟡 For Writers (Authors)
- **Markdown Editor:** Write rich text content easily.
- **AI Assistant:** - Generate full blog posts (Title, Content, Excerpt) using **Gemini AI**.
  - Auto-generate photorealistic cover images using **Pollinations.ai (Flux Model)**.
- **Dashboard:** Manage drafts, published posts, and view read counts.

### 🔴 For Admins
- **Admin Dashboard:** Visual statistics (Users, Posts, Likes, Comments).
- **User Management:** Block/Unblock users.
- **Content Moderation:** Approve/Reject comments.
- **Request Handling:** Review "Become Author" requests with document downloads and Approve/Reject actions.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Cloudinary Account
- Google Gemini API Key
