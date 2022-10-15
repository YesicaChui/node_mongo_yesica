import {body,query} from 'express-validator'

/**
 * Schema para validar los queryparams del listado de usuarios
 * page int min 1
 * per_page min 1
 */
const createSchema = [
    body("name").notEmpty().withMessage('name is required').isLength({min:3, max: 10}),
    body("last_name").notEmpty().withMessage('last_name is required').isLength({min:3, max: 20}),
    body("username").notEmpty().withMessage('username is required').isLength({min:3, max: 15}),
    body("email").notEmpty().withMessage('email is required').isEmail(),
    body("password").notEmpty().withMessage('password is required').isLength({min:5, max: 16})
];
//https://github.com/validatorjs/validator.js/blob/master/README.md
const allSchema= [
    query("page").isInt({min:1}),
    query("per_page").isInt({min:1}),

];
export {createSchema,allSchema}