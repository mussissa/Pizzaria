import {Request, Response} from 'express'
import { DetalheOrderService } from "../../services/Orders/DetalheOrderService";


class DetalheOrderController{
    
    async handle(req:Request, res:Response,){

    const order_id = req.query.order_id as string;
        
    const detalhe = new DetalheOrderService();

    const orderDet = await detalhe.execute(order_id)

    return res.json(orderDet)

    }

}


export {DetalheOrderController}
