import prismaClient from "../../prisma";


class CreateCategoryService{
    async execute(name:string){

        if(name == ''){
            throw new Error("nome de categoria invalida");
        }
        
        const CategoryExiste = await prismaClient.category.findFirst({
            where:{name:name}
        })

        if(CategoryExiste){
            throw new Error("categoria ja existe");
        }

        const categoria = await prismaClient.category.create({data:{name}, select:{id:true, name:true}})

        return categoria
    }


}



export {CreateCategoryService}