import prismaClient from "../../prisma";




class DeleteOrderService{

    async execute(oder_id:string){

        console.log("entrou no service com id da mesa : "+ oder_id)
        const ordem = await prismaClient.order.delete({
            where:{id:oder_id}
        })
        console.log("saindo do service id da mesa : "+ ordem)
        return ordem;

    }



}


export {DeleteOrderService}