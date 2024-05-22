import axios, {Axios, AxiosError} from "axios";
import {parseCookies} from 'nookies'
import { AuthTokenError } from "./erros/AuthTokenError";
import { signOut } from "@/contexts/AuthContext";


export function setupAPI(context = undefined){

    let cookies = parseCookies(context)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers:{
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })


    api.interceptors.response.use(response => {
        return response
    },(error:AxiosError)=> {
        if(error.response?.status ===401){
            
            if(typeof window !== undefined){
                signOut()
            }else{
                return Promise.reject(new AuthTokenError())
            }


        }

        return Promise.reject(error)
    })


    return api;
}