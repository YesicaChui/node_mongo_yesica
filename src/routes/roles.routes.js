import { Router } from "express";
import RoleController from "../controllers/roles.controllers";
import validation from "../middlewares/validation";
import { createSchema,allSchema,getByFieldSchema,updateSchema,deleteSchema  } from "../validators/roles.validators";
import authentication from "../middlewares/authentication"
const router = Router();
const controller = new RoleController();
//router.use(authentication); protege todas las rutas

router.get("/", validation(allSchema),(request, response) => controller.all(request,response));
router.post("/",[authentication,validation(createSchema)],(request, response)=> controller.createDocument(request,response));
router.get('/:code', [authentication,validation(getByFieldSchema)],(request,response)=>controller.getByField(request, response))
router.put('/:code', [authentication,validation(updateSchema)],(request,response)=>controller.updateDocument(request, response))
router.delete('/:code', [authentication,validation(deleteSchema)],(request,response)=>controller.deleteDocument(request, response))

export default router;
