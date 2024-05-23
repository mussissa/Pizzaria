import { Response, Request } from "express";

import { AlterOrdemService } from "../../services/Orders/AlteraOrdem";



class AlteraOrdemController{

    async handle(req:Request, res:Response){
        
        const {id} = req.body;
        
        const ordem = new AlterOrdemService();

        const AlteraOrdem = await ordem.execute(id)


        return res.json(AlteraOrdem);
    }



    async handleManda(req:Request, res:Response){
        
        const {id} = req.body;
        
        const ordem = new AlterOrdemService();

        const AlteraOrdem = await ordem.MandaPedido(id)


        return res.json(AlteraOrdem);
    }
}


export {AlteraOrdemController}