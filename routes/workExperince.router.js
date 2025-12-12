import express from 'express'
import { getWorkExperience, addWorkExperience, updateWorkExperience, deleteWorkExperience } from '../controllers/workExperince.controller.js'
import { protect } from '../middlewars/auth.middleware.js'
import upload from '../middlewars/upload.middleware.js'
import { optimizeImage } from '../middlewars/optimizeImage.middleware.js'

const router = express.Router()

router.get('/', getWorkExperience)
router.post('/add', protect, upload.single("image"), optimizeImage, addWorkExperience)
router.put('/update/:id', protect, upload.single("image"), optimizeImage, updateWorkExperience)
router.delete('/delete/:id', protect, deleteWorkExperience)

export default router;