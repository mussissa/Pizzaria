import { Request, Response, json } from "express";
import { ListCategoryService } from "../../services/Category/ListCategoryService";

class ListCategoryController{

  async handle(req:Request, res:Response){
      
      const categoryController = new ListCategoryService()
      const listarCategoria = await categoryController.execute()
      
      return res.json(listarCategoria)

  }

}


export {ListCategoryController}


