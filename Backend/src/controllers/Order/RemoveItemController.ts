import { Request, Response } from "express";
import { RemoveItemService } from "../../services/Orders/RemoveItemService";


class RemoveItemController{
    async handle (req:Request, res:Response){
        const id = req.query.id as string; 
        
        const item = new RemoveItemService();

        const removido = await item.execute(id)

        return res.json(removido)
    }
}


export {RemoveItemController}

