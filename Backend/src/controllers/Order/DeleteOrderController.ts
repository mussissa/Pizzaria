import {Request, Response} from 'express'

import { DeleteOrderService } from '../../services/Orders/DeleteOrderService'



class DeleteOrderController{

    async handle(req:Request, res:Response){

        const order_id = req.query.order_id as string;
        console.log("entrou no contoller com ID :" + order_id)
        const order = new DeleteOrderService();


        const odemde = await order.execute(order_id);

        return res.json(odemde)
    }
}


export {DeleteOrderController}