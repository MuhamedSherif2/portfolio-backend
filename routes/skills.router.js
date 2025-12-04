import express from 'express'
import { getSkills, addSkill, updateSkill, deleteSkill } from '../controllers/skills.controller.js'
import { protect } from '../middlewars/auth.middleware.js'
import upload from '../middlewars/upload.middleware.js'
import { optimizeImage } from '../middlewars/optimizeImage.middleware.js'

const router = express.Router()

router.get('/', getSkills)
router.post('/add', protect, upload.single("image"), optimizeImage, addSkill)
router.put('/update/:id', protect, upload.single("image"), optimizeImage, updateSkill)
router.delete('/delete/:id', protect, deleteSkill)

export default router;
