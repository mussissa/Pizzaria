import prismaClient from "../../prisma";


class ListCategoryService{
   
   
    async execute(){
       
        const categorias = await prismaClient.category.findMany({select:{id:true, name:true}})
       
        return categorias
    }

}



export {ListCategoryService}