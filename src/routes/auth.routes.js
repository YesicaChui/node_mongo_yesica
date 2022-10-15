import {Router} from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();
const controller= new AuthController()

router.post('/signup',(request,response)=>{controller.signUp(request,response)})
router.post('/signin',(request,response)=>{controller.signIn(request,response)})
router.post('/refresh_token',(request,response)=>{controller.refreshToken(request,response)})
export default router;