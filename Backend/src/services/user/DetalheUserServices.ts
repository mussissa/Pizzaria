import prismaClient from "../../prisma";

class DetalheUserServices{
    async execute(id:string){
        
        const userExist = await prismaClient.user.findFirst({
            where:{id:id}, select:{id:true, name:true, email:true}
        })

        if(!userExist){
            throw new Error("id não existe");
        }
             
        return userExist
    }
}



export { DetalheUserServices }