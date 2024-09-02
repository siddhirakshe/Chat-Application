import express from "express";
import {signup, login, logout} from '../controllers/authcontroller'

const router=express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)


// router.get("/login",(req,res)=>{
//     res.send("login credentials")
// })

export default router