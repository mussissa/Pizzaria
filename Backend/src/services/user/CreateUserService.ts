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

        console.log(userExist)

        const password = await hash(senha, 8)

        console.log(password)

        const user = await prismaClient.user.create({
            data:{name:name, email:email, password:password},
            select:{
                id:true,
                name:true,
                email:true
            }})

        
        console.log("saindo do service")    
        return {user}
    }
}

export {CreateUserService}