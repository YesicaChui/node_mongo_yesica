import {body,query,param} from 'express-validator'

/**
 * Schema para validar los queryparams del listado de usuarios
 * page int min 1
 * per_page min 1
 */
 const allSchema= [
    query("page").isInt({min:1}),
    query("per_page").isInt({min:1}),

];
const createSchema = [
    body("name").notEmpty().withMessage('name is required').isLength({min:3}),
    body("code").notEmpty().withMessage('code is required').isLength({min:2}),
];

const getByFieldSchema = [
    param("code").notEmpty()
];
const updateSchema = [
    param("code").notEmpty(),
    body("name").optional().isLength({min:3}),
    body("code").optional().isLength({min:2}),
];

const deleteSchema = [
    param("code").notEmpty()
];
//https://github.com/validatorjs/validator.js/blob/master/README.md

export {createSchema,allSchema,getByFieldSchema,updateSchema,deleteSchema}