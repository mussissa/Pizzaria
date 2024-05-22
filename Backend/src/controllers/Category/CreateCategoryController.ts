import { Request, Response, json } from "express";
import { CreateCategoryService } from "../../services/Category/CreateCategoryService";

class CreateCategoryController{

async handle(req:Request, res:Response) {

    const {name} = req.body

    const categoryController = new CreateCategoryService()

   const categoria = await categoryController.execute( name )

    return res.json(categoria)
   }

}


export {CreateCategoryController}


