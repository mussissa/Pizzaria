
import styles from './styles.module.scss';
import { FormEvent, useState } from "react";
import { setupAPI } from "@/services/api";
import { toast } from "react-toastify";

import Modal from 'react-modal';

import { ModalOpenOrder } from "@/components/ModalOpenOrder";

import Head from "next/head";
import { canSSAuth } from '@/utils/canSSRAuth';



type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  ListaCategoria: ItemProps[];
}



export default function Mesa({ListaCategoria}:CategoryProps) {
  const [mesa, setMesa] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState('');


  const [categoriaSelecionada, setcategoriaSelecionada] = useState('')

  const [ordem, setOrdem] = useState<CategoryProps[]>([]);


  async function handleOpenModal() {
    if (!openModal) {
      setOpenModal(true);
    }
  }

  async function handleCloseModal() {
    if (openModal) {
      setOpenModal(false);
    }
  }

  async function envia(event: FormEvent) {
    event.preventDefault();
    
    const apiClient = setupAPI();

    const resposta = await apiClient.post("/order", { table: parseInt(mesa) });

    setId(resposta.data.id)

    toast.success("Mesa Aberta");
    setOpenModal(true);

  }



  const Desiste = async ()  =>{
       
    const apiClient = setupAPI()
    console.log("id da mesa a ser deletada : "+id)

    

     await apiClient.delete('/order/', {params:{order_id:id}} )

    toast.success('Mesa Fechada')

    setOpenModal(false);
    
    setMesa("");
 } 

  Modal.setAppElement("#__next");

  return (
    <>
        <Head>
            <title> Mesa </title>
        </Head>     

  
      <main className={styles.container}> 
      <span className={styles.span}>Novo Pedido</span>
      <form onSubmit={envia}>
        <input
          className={styles.input}
          type="text"
          placeholder="Numero da Mesa"
          value={mesa}
          onChange={(e) => setMesa(e.target.value)}
        />
        <button className={styles.botao} type="submit">
          Abrir Mesa
        </button>
      </form>
      </main>
   
    {openModal && (
        <ModalOpenOrder isOpen={openModal} onRequestClose={handleCloseModal} ordem_mesa={mesa} ordem_id={id} apaga={Desiste} CategoryList={ListaCategoria} />
      )}

    </>
  )
}



export const getServerSideProps = canSSAuth(async (ctx) => {
  const apiClient = setupAPI(ctx);
  const response = await apiClient.get('/category');
      

    return {
        props: {
          ListaCategoria: response.data
        }
      }

})