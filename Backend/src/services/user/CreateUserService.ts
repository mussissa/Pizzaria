import prismaClient from "../../prisma"
import { hash } from "bcryptjs"

interface UserRequest{
    name:string,
    email:string,
    senha:string
}

class CreateUserService{
    async execute({name,email,senha}:UserRequest){
       
        if(!email){
            throw new Error("Email incorreto")
        }

        const userExist = await prismaClient.user.findFirst({
            where:{email:email}
        })

        if(userExist){
            throw new Error("usuario ja existe");
        }

        const password = await hash(senha, 8)


        const user = await prismaClient.user.create({
            data:{name:name, email:email, password:password},
            select:{
                id:true,
                name:true,
                email:true
            }})

        
        return {user}
    }
}

export {CreateUserService}