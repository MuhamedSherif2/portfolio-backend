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

// Load environment variables at the very top
dotenv.config()

// Connect to database
DB()

// create admin automatically if not exists
ensureDefaultAdmin();

const port = process.env.PORT || 3000
const app = express()

// Apply middleware
app.use(cors)
app.use(express.json())


// routes
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


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})