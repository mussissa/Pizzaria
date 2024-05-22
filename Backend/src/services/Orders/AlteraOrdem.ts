import prismaClient from "../../prisma"

class AlterOrdemService{

    async execute(id:string){
        
        
        const altera_id = await prismaClient.order.update({
            where:{id:id},
            data:{status:true}
        })

        return altera_id;
    }


    async MandaPedido(id:string){
        
        
        const altera_id = await prismaClient.order.update({
            where:{id:id},
            data:{draft:false}
        })

        return altera_id;
    }

}


export {AlterOrdemService}