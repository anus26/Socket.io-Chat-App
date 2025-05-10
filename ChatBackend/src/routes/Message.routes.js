import express from 'express'
import { sendmessage,  getmessage }  from '../Controllers/Message.Controllers.js';
import authMiddleware from '../middleware/middleware.js';

const router=express.Router()

router.post("/send/:id",authMiddleware,sendmessage)
router.get("/get/:id",authMiddleware,getmessage)

export default router;