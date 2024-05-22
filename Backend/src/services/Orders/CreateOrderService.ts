import prismaClient from "../../prisma";

interface ProductRequest{
    table: number;
    name: string;
 }
 

class CreateOrderService{

    async execute({table, name}:ProductRequest){

        const ordem = await prismaClient.order.create({data:{table:table, name:name},
        select:{id:true, table:true, name:true}
        })
        console.log(ordem)
        return ordem

    }


}


export { CreateOrderService }