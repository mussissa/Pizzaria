import { Header } from "@/components/Header"
import Head from "next/head"
import styles from './styles.module.scss'
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { setupAPI } from "@/services/api"
import { canSSAuth } from "@/utils/canSSRAuth"




export default function Categoria(){

    const [name, setName ] = useState('')


    async function hangleRegister(event:FormEvent) {
        event.preventDefault(); 

       // alert(name)
        if(name==='' ){
            toast.warning('Precisa preencher o campo')
          
            return;
          }
      
        const apiClient = setupAPI();

        await apiClient.post('/category', {name:name})

        toast.success('Categoria cadastrada');

        setName('');
        
    }


    return(
        <>
        <Head>
            <title> Categorias </title>
        </Head>     

        <div>
           <Header  />

            <main className={styles.container}>
                <h1>Cadastrar Categorias</h1>

                <form className={styles.form} onSubmit={hangleRegister}>
                    <input  className={styles.input}  type="text" placeholder="digite o nome da categoria"
                                                    value={name} onChange={(e)=>setName(e.target.value)}/>
                    <button className={styles.buttonAdd} type="submit">
                        Cadastrar
                    </button>
                </form>

            </main>


        </div>
        
        
        
        </>

    )
}



export const getServerSideProps = canSSAuth(async (ctx) => {

    
    return {
        props: {}
      }

})