import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { api } from "@/services/apiClient";
import {toast} from 'react-toastify'




type AuthContextData = {
   user: UserProps | null; 
   isAuthenticated: boolean;
   signIn: (credentials : SignProps) => Promise<void>;
   signOut: ()=> void;
   signUp: (credentials : SignUpProps) => Promise<void>;
}


type UserProps = {
    id: string;
    name: string;
    email: string;
}


type SignProps = {
    email: string;
    senha: string;
}

type SignUpProps = {
    name: string;
    email: string;
    senha: string;
}


type AuthProviderProps = {
    children : ReactNode;
}



export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
    try {
       destroyCookie(undefined, '@nextauth.token') 
       Router.push('/') 
       toast.success('usuario desconectado')
    } catch (error) {
        console.log('erro ao deslogar')
    }
}

export function AutProvider({children}: AuthProviderProps){
   
    const [user, setUser] = useState<UserProps | null>(null)

    const isAuthenticated = !!user;

    useEffect(()=>{
    
        const {'@nextauth.token':token} = parseCookies();

        if(token){
            api.get('/info').then(response =>{
                const {id, name, email} = response.data;

                setUser({id, name, email})
            })
            .catch(() => {
                signOut();
            })
        }

    }, [])

    async function signIn({email, senha}:SignProps){

        try {
            const response = await api.post("/login",{
                email,
                senha 
            })
            console.log(response.data)

            const {id, name, token} = response.data;

            setCookie(undefined,'@nextauth.token', token,{
               MaxAge: 60 * 60 * 24 * 30,
               path: "/"
            })
                
            setUser({id, name, email})
             // Passa para proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('logado com sucesso')

            Router.push('/dashboard')
           

        } catch (error) {
            toast.error('Erro ao Acessar')
           
        }
  
    
    }


    async function signUp({name, email, senha}:SignUpProps){

        try {
            const response = await api.post("/users",{
                name,
                email,
                senha 
            })
           
            toast.success('CADASTRADO COM SUCESSO')

            Router.push('/')
            

        } catch (error) {
            toast.error('Erro ao Cadastrar')
           
        }
  
    
    }
   
    return (
        <AuthContext.Provider value={{ user,  isAuthenticated, signIn, signOut, signUp }} >
            {children}
        </AuthContext.Provider>

    )

}


