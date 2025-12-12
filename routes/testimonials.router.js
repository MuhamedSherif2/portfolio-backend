import express from 'express'
import { getTestimonials, getShowTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonials.controller.js'
import { protect } from '../middlewars/auth.middleware.js'

const router = express.Router()

router.get('/', getTestimonials)
router.get('/get', getShowTestimonials)
router.post('/add', protect, addTestimonial)
router.put('/update/:id', protect, updateTestimonial)
router.delete('/delete/:id', protect, deleteTestimonial)

export default router;
