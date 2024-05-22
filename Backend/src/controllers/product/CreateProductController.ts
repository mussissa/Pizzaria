import { Request, Response } from "express";
import { CreateProductsService } from "../../services/product/CreateProductsService";

class CreateProductController{
    async handle(req:Request, res:Response){
        const {name, price, description, category_id} = req.body

        const createProductController = new CreateProductsService();

        if(!req.file){
            throw new Error("error upload file")
        }
           const {originalname ,filename:banner} = req.file; 
           
        
        const produto = await createProductController.execute({ name, price, description, banner, category_id })
        

        return res.json(produto)

    }


}


export {CreateProductController}