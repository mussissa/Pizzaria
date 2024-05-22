import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import logoImg from '../../public/logo.svg';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

import { AuthContext } from "@/contexts/AuthContext";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { exportTraceState } from "next/dist/trace";
import { GetServerSideProps } from "next";
import { canSSGuest } from "@/utils/canSSRGuest";

export default function Home() {

  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [loading, setLoading] = useState(false)

  async function handleLogin(event:FormEvent) {
    event.preventDefault();    //evitar que o botão recarregue a pagina limpando os dados

    if(email==='' || senha ===''){
      toast.warning('Precisa preencher os campos')
      return;
    }

    setLoading(true);

    let dados = {
      email,
      senha
    }

    await signIn(dados);

    setLoading(false);
  }


  return (
    <>
      <Head>
        <title>Pizzaria</title>
      </Head>
        <div className={styles.container}>
        <div className={styles.containerCenter}>
          <Image src={logoImg} alt="Logo Pizzaria" />
          </div>   
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="digite seu e-mail" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <Input placeholder="digite sua senha" type="password"  value={senha} onChange={(e) => setSenha(e.target.value)}/>

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>
          <Link href='/cadastro'className={styles.text}> Não possui uma conta? Cadastre-se</Link>
        </div>
        
        </div>
    </>
  );
}




export const getServerSideProps = canSSGuest(async (ctx) =>{
  const nova = 'OLA'
  return {
    props: {nova}
  }
})