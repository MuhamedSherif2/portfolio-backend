import express from "express";
import { addCategory, deleteCategory, getCategory } from '../controllers/projectCatergory.controller.js'
import { protect } from '../middlewars/auth.middleware.js'

const router = express.Router()

router.get('/', getCategory)
router.post('/add', protect, addCategory)
router.delete('/delete/:id', protect, deleteCategory)

export default router;
