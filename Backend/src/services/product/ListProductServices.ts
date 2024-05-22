import prismaClient from "../../prisma";


class ListProductServices {
    async execute(){
        
        const listaProdutos = await prismaClient.product.findMany({select:{name:true, price:true}})
        console.log(listaProdutos);
        return listaProdutos
    }


    async executCat(category_id: string){
        console.log("Service " + category_id)
        const litsProdutosCat = await prismaClient.product.findMany({
          where: {category_id: category_id}, select:{id:true,name:true,price:true,description:true}  
            
        })
        
        return litsProdutosCat;
    }
}


export {ListProductServices}