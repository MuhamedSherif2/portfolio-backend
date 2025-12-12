import express from 'express'
import cors from './middlewars/cors.middleware.js'
import DB from './config/db.config.js'
import dotenv from 'dotenv'
import { ensureDefaultAdmin } from "./controllers/login.controller.js";

// import routers
import AboutMe from './routes/aboutMe.router.js'
import Certification from './routes/certifications.router.js'
import Cover from './routes/cover.routes.js'
import Login from './routes/login.routes.js'
import Projects from './routes/project.routes.js';
import ProjectsCategory from './routes/projectCategory.routes.js'
import Services from './routes/services.router.js'
import Skills from './routes/skills.router.js'
import SkillsCategory from './routes/skillsCategory.router.js'
import Testimonials from './routes/testimonials.router.js'
import WorkExperince from './routes/workExperince.router.js'
import Contact from "./routes/contact.routes.js";

// ✅ 1. Load environment variables first
dotenv.config()

const port = process.env.PORT || 3000
const app = express()

// ✅ 2. Apply middleware BEFORE routes
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // ⭐ مهمة لـ form-data

// ✅ 3. Define routes (لكن السيرفر لسه مش شغّال)
app.use('/api/aboutme', AboutMe)
app.use('/api/certification', Certification)
app.use("/api/contact", Contact);
app.use('/api/cover', Cover)
app.use('/api/login', Login)
app.use('/api/projects', Projects)
app.use('/api/projectcategory', ProjectsCategory)
app.use('/api/services', Services)
app.use('/api/skills', Skills)
app.use('/api/skillscategory', SkillsCategory)
app.use('/api/testimonials', Testimonials)
app.use('/api/workexperince', WorkExperince)

// ✅ 4. Create async startup function
const startServer = async () => {
    try {
        // ⏳ انتظر الاتصال يتم تماماً
        await DB()

        // ✅ بعد الاتصال، نفذ الـ admin function
        await ensureDefaultAdmin();
        console.log("✅ Admin check completed")

        // 🚀 بس بعد كده شغّل السيرفر
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`)
        })
    } catch (error) {
        console.error("❌ Failed to start server:", error)
        process.exit(1)
    }
}

// ✅ 5. نفّذ كل حاجة بالترتيب
startServer()