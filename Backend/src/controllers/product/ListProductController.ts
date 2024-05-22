import {Request, Response} from 'express'
import { ListProductServices } from "../../services/product/ListProductServices";



class ListProductController{
    async handle( req:Request, res:Response,){
             
        const listaProdutos = new ListProductServices();

        const lista = await listaProdutos.execute()


        return res.json(lista)

    }

    async Listcat( req:Request, res:Response){

        
        const category_id = req.query.category_id as string;
    
        const listaProdutosCat = new ListProductServices();

        const listcat = await listaProdutosCat.executCat(category_id);
        
        return res.json(listcat)

    }

}


export {ListProductController}
