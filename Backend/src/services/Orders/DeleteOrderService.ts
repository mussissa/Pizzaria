import prismaClient from "../../prisma";




class DeleteOrderService{

    async execute(oder_id:string){

        const ordem = await prismaClient.order.delete({
            where:{id:oder_id}
        })
        return ordem;

    }



}


export {DeleteOrderService}