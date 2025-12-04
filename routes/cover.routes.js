import express from 'express'
import { addCover, deleteCover, getCover, updateCover } from '../controllers/cover.controller.js'
import { protect } from '../middlewars/auth.middleware.js'
import upload from '../middlewars/upload.middleware.js'
import { optimizeImage } from '../middlewars/optimizeImage.middleware.js'

const router = express.Router()

router.get('/', getCover)
router.post('/add', protect, upload.single("image"), optimizeImage, addCover)
router.put('/update/:id', protect, upload.single("image"), optimizeImage, updateCover)
router.delete('/delete/:id', protect, deleteCover)

export default router;
