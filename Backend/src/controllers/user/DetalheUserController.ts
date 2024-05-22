import {Request, Response} from 'express'
import { DetalheUserServices } from '../../services/user/DetalheUserServices';

class DetalheUserController{
    async hande(req:Request, res: Response){

        const id = req.user_id;

        const detalheUserServices = new DetalheUserServices();

        const user = await detalheUserServices.execute(id);


        return res.json(user)

    }



}


export {DetalheUserController}