import prismaClient from "../../prisma";

interface ProductRequest{
   name:string;
   price: string;
   description: string;
   banner: string;
   category_id:string
}


class CreateProductsService{
    async execute({name, price, description, banner, category_id}:ProductRequest){
        if(name === ''){
            throw new Error("nome de categoria invalida");
        }

        if(price === ''){
            throw new Error("Preço de categoria invalida");
        }

        if(description === ''){
            throw new Error("Descrição de categoria invalida");
        }

        if(banner === ''){
            throw new Error("banner de categoria invalida");
        }

        if(category_id === ''){
            throw new Error("id de categoria invalida");
        }


        const existeId = await prismaClient.category.findFirst({where:{id:category_id}})

        if(!existeId){
            throw new Error("referencia invalida");
        }else{
            const produto = await prismaClient.product.create({
                data:{name:name, price:price, description:description, banner:banner, category_id:category_id},
                select:{name:true,price:true,category_id:true}
            })
            return produto
        }

        
        
    }

}


export {CreateProductsService}