import prismaClient from "../../prisma";


class ListProductServices {
    async execute(){
        
        const listaProdutos = await prismaClient.product.findMany({select:{name:true, price:true}})
       
        return listaProdutos
    }


    async executCat(category_id: string){
      
        const litsProdutosCat = await prismaClient.product.findMany({
          where: {category_id: category_id}, select:{id:true,name:true,price:true,description:true}  
            
        })
        
        return litsProdutosCat;
    }
}


export {ListProductServices}