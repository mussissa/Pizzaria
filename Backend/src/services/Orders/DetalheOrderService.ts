import prismaClient from "../../prisma";

class DetalheOrderService{

    async execute(order_id: string){
        const orders = await prismaClient.item.findMany({
            where:{order_id:order_id},
            include:{
                product:true,
                order:true,
            }
        })

        return orders ;
    }

}


export {DetalheOrderService}