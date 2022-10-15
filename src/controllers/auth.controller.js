import users from "../models/users";
import {jwtSignIn, jwtVerify} from "../helpers/jwt";
import {UserNotFoundException,UserDisabledException} from "../exceptions/users.exceptions" 
import {PasswordIncorrectException} from "../exceptions/auth.exceptions"
class AuthController{
    constructor(){
        this.model=users;
    }

    async signUp(request, response){
        try{
            const {name, last_name, username, email, password} = request.body;

            const document = this.model({
                name,
                last_name,
                username,
                email,
                password,
                role_code:"USER"
            });
            await document.hashPassword();
            await document.save();
            return response.status(201).json(document)
        }catch (error) {
            return response.status(500).json({
                message: error?.message||"Ocurrio un error"
            })
        }
    }

    async signIn(request, response){
        try{
            const {username, password}= request.body;

            const user = await this.model.findOne({
                username,                
            });
            if(!user) throw new UserNotFoundException();
            if(!user.status) throw new UserDisabledException();
            const validatePassword = await user.validatePassword(password);
            if(!validatePassword) throw new PasswordIncorrectException();
            const authToken= jwtSignIn({id:user.username})
            return response.status(200).json(authToken)
        }catch (error) {
            return response.status(500).json({
                message: error?.message||"Ocurrio un error"
            })
        }
    }

    async refreshToken(request, response){
        try{
            const {refresh_token}= request.body;
            const payload = jwtVerify(refresh_token);
            const {accessToken} =jwtSignIn({id:payload.id})
            return response.status(200).json({accessToken})

        }catch (error) {
            return response.status(500).json({
                message: error?.message||"Ocurrio un error"
            })
        }
    }
}

export default AuthController