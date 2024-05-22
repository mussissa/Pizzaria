import { Request, Response } from "express";
import { AlgoriService } from "../../services/Testes/algoService";



class AlgoController {

  async handle(req:Request, res:Response){
        
        const string ='[([]])';  
    

        const calculo = new AlgoriService()

        const resultado = calculo.execute(string)


        return res.json(resultado);
  } 

}


export {AlgoController}