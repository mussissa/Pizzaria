import prismaClient from "../../prisma";

interface Itens{
  order_id: string,
  product_id: string,
  amount: number  
}

class AddItemService{
    async execute({order_id, product_id, amount}: Itens){

        const criaItem = await prismaClient.item.create({data:{order_id:order_id,product_id:product_id,amount:amount},
          select:{id:true, order_id:true,  product_id:true, amount:true}
        })

        return criaItem

    }
}


export {AddItemService}