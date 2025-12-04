import express from 'express'
import { loginAdmin } from '../controllers/login.controller.js'
const router = express.Router()

router.post("/", loginAdmin);

export default router;