import express from 'express'
import { getServices, addServices, updateServices, deleteServices } from '../controllers/services.controller.js'
import { protect } from '../middlewars/auth.middleware.js'
import upload from '../middlewars/upload.middleware.js'
import { optimizeImage } from '../middlewars/optimizeImage.middleware.js'

const router = express.Router()

router.get('/', getServices)
router.post('/add', protect, upload.single("image"), optimizeImage, addServices)
router.put('/update/:id', protect, upload.single("image"), optimizeImage, updateServices)
router.delete('/delete/:id', protect, deleteServices)

export default router;
