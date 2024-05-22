import {Request, Response} from 'express'
import { AddItemService } from "../../services/Orders/AddItemService";



class addItemController{

    async handle(req:Request, res: Response){
            const {amount, order_id, product_id} = req.body
            console.log("entrou nocontroller " + amount +" "+order_id+" "+product_id )
            const additem = new AddItemService();


            const criaItem = await additem.execute({order_id, product_id, amount})


            return res.json(criaItem);
    }

}


export {addItemController}