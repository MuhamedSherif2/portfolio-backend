import express from 'express'
import { getSkillsCategory, addSkillCategory, updateSkillCategory, deleteSkillCategory } from '../controllers/skillsCategory.controller.js'
import { protect } from '../middlewars/auth.middleware.js'

const router = express.Router()

router.get('/', getSkillsCategory)
router.post('/add', protect, addSkillCategory)
router.put('/update/:id', protect, updateSkillCategory)
router.delete('/delete/:id', protect, deleteSkillCategory)

export default router;