import express from "express"
import { singnup, login, logout, allUser } from "../Controllers/user.Controller.js"
import authMiddleware from "../middleware/middleware.js"


const router=express.Router()
router.post("/singnup",singnup)
router.post("/login",login)
router.post("/logout", logout)
router.get("/alluser", authMiddleware,allUser)
export default router;


