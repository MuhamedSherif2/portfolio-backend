import express from 'express'
import { getCertification, addCertification, updateCertification, daleteCertification } from '../controllers/certifications.controller.js'
import { protect } from '../middlewars/auth.middleware.js'
import upload from '../middlewars/upload.middleware.js'
import { optimizeImage } from '../middlewars/optimizeImage.middleware.js'

const router = express.Router()

router.get('/', getCertification)
router.post('/add', protect, upload.single("image"), optimizeImage, addCertification)
router.put('/update/:id', protect, upload.single("image"), optimizeImage, updateCertification)
router.delete('/delete/:id', protect, daleteCertification)

export default router;
