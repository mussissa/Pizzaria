import { Request, Response } from "express";
import { AutenticationService } from "../../services/user/AuthenticationService";

class AutenticationController{

    async handle(req:Request, res:Response){
       const {email, senha} = req.body
       const autenticacao = new AutenticationService()

       const auth = await autenticacao.execute({
          email,
          senha
        })
        console.log(auth)
        return res.json(auth);
    }

}


export {AutenticationController}