import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import logoImg from '../../../public/logo.svg'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";


export default function Cadastro() {
  const [name, setName ] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const[ loading, setLoading] = useState(false)

  const  {signUp} = useContext(AuthContext)

  async function handleSignUp(event:FormEvent) {
    event.preventDefault();    //evitar que o botão recarregue a pagina limpando os dados

    if(name==='' ||email==='' || senha ===''){
      toast.warning('Precisa preencher os campos')
    
      return;
    }

    setLoading(true);

    let dados = {
      name,
      email,
      senha
    }

    await signUp(dados);

    setLoading(false);
  }



  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
   
        <div className={styles.containerCenterCadastro}>
          <Image src={logoImg} alt="Logo Pizzaria" />
         
        <div className={styles.loginCadastro}>
            <h1> complete o cadastro</h1>
          <form onSubmit={handleSignUp}>
            <Input placeholder="digite seu nome" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <Input placeholder="digite seu e-mail" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <Input placeholder="digite uma senha" type="password" value={senha} onChange={(e)=>setSenha(e.target.value)}/>
            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>
          <Link href='/'className={styles.text}> Ja possuo conta login </Link>
        </div>
        </div>   
       
    </>
  );
}




