import {Request, Response} from 'express'

import { ListOrderService } from '../../services/Orders/ListOrderService'


class ListOrderController{

    async handle(req:Request, res:Response){

        const order = new ListOrderService()

        const comanda = await order.execute()

        return res.json(comanda)

    }


}


export {ListOrderController}