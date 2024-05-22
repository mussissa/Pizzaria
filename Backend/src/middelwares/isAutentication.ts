import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface Payload{
    sub:string;
}

export function isAutentication(
    req:Request,
    res:Response,
    next: NextFunction
){
    const authToken = req.headers.authorization;
    
    if(!authToken){
        return res.status(401).end();
    }

    const [ bearer, token] = authToken.split(" ")

    try {
       const {sub} = verify(
        token,
        process.env.JWT_SECRET
       ) as Payload;

       // pegar id e colocar dentro do req
       req.user_id = sub;

       return next()

    } catch (error) {
        return res.status(401).end();
    }

    
    
}