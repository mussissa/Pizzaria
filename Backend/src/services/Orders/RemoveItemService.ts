import prismaClient from "../../prisma";



class RemoveItemService{
    async execute(id:string){
        const del = await prismaClient.item.delete({where:{id:id}})

        return del;
    }
}


export {RemoveItemService}