import { Router } from "express";
import UserController from '../controllers/users.controllers'
import validation from "../middlewares/validation";
import { createSchema,allSchema } from "../validators/users.validators";
import authentication from "../middlewares/authentication"

const router = Router();
const controller = new UserController();
router.use(authentication);
router.get("/", validation(allSchema), (request, response) => controller.all(request, response));
router.post("/",validation(createSchema), (request, response)=> 
    controller.createDocument(request,response)
);
router.get('/:username', (request,response)=>controller.getById(request, response))
router.put('/:username', (request,response)=>controller.updateDocument(request, response))
router.delete('/:username', (request,response)=>controller.deleteDocument(request, response))
export default router;
