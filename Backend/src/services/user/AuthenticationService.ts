import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from 'jsonwebtoken';


interface AutenticationRequest{
    email:string;
    senha:string;
}


class AutenticationService{
    
    async execute({email, senha}: AutenticationRequest){
        const userExist = await prismaClient.user.findFirst({
            where:{email:email}
        })
     
        if(!userExist){
            throw new Error("usuario não existe");
        }
       
        const checkPassword = await compare(senha, userExist.password)

        if(!checkPassword ){
            throw new Error("senha incorreta");
        }

        const token = sign(
            {
                name:userExist.name,
                email:userExist.email
            }, process.env.JWT_SECRET,
            {
                subject: userExist.id,
                expiresIn: '30d'
            }
        )

       
        return {
            id: userExist.id,
            name: userExist.name,
            email: userExist.email,
            token: token
        }


    }
}


export {AutenticationService}