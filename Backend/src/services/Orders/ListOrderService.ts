import prismaClient from "../../prisma";

class ListOrderService{

    async execute(){
        
        const order = await prismaClient.order.findMany( {where:{status:false}})

        return order
    }

}


export {ListOrderService}