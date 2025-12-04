import express from 'express'
import { addAboutMe, daleteAboutMe, getAboutMe, updateAboutMe } from '../controllers/aboutMe.controller.js'
import { protect } from '../middlewars/auth.middleware.js'

const router = express.Router()

router.get('/', getAboutMe)
router.post('/add', protect, addAboutMe)
router.put('/update', protect, updateAboutMe)
router.delete('/delete', protect, daleteAboutMe)

export default router;
