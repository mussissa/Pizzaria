import {Request, Response} from 'express'
import { CreateOrderService } from '../../services/Orders/CreateOrderService';



class CreateOrderController{

    async handle(req:Request, res:Response){
        
        const {table, name} = req.body;


        const order = new CreateOrderService();


        const ordem = await order.execute({table,name})
     

        return res.json(ordem)

        
    }
}


export {CreateOrderController}