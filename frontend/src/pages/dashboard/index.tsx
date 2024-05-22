import { canSSAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import { Header } from "../../components/Header" 
import styles from './styles.module.scss'
import { FiRefreshCcw } from "react-icons/fi"
import { setupAPI } from "@/services/api"
import { useEffect, useState } from "react"
import Modal from 'react-modal';
import { ModalOrder } from "@/components/ModalOrder";
import { toast } from "react-toastify";



type OrderProps ={
    id:string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}


interface HomeProps{
    ListaOrdem: OrderProps[];
}

export type OrderItemProps ={
    id:string;
    amount: number;
    order_id: string;
    product_id:string;
    product:{
        id:string;
        name:string;
        description:string;
        price:string;
        banner:string;
    }
    order:{
        id:string;
        table:string |number;
        status:boolean;
        name:string | null;
    }
}

export default function Dashboard({ListaOrdem}: HomeProps) {

    const [orderList, setOrderList] = useState(ListaOrdem || [] )
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTable, setSelectedTable] = useState();
    
    const [modalItem, setModalItem] = useState<OrderItemProps[]>();

    const [isPressed, setIsPressed] = useState(false);
   
    /*ordenar a lista de pedidos por numero da mesa  sort(a,b) => a - b */
    orderList.sort((a, b) =>{
        if(typeof a.table ==='number' && typeof b.table ==='number'){
            return   a.table - b.table ;
        }

        return 0
    })
    


    async function handleDetalheMesa(item, id){

        
        if(!openDialog){
        const apiClient = setupAPI()

       const response = await apiClient.get('/order/detalhe', {params:{order_id:item.id}} )
         
       setModalItem(response.data);
        
        setSelectedTable(id)
        setOpenDialog(true)
        console.log(modalItem)
      }
    }
 
    const handleCloseDialog = () => {
        if(openDialog){
        setOpenDialog(false);}
      };


     const mostra = async ()  =>{
       
        const apiClient = setupAPI()

         await apiClient.delete('/order/', {params:{order_id:selectedTable}} )

        const response = await apiClient.get('/order');
        
        toast.success('Comanda em branca removida')

        setOrderList(response.data)

        setOpenDialog(false);
    } 


    async function refreshOrder() {
        setIsPressed(true);
        setTimeout(() => {
            setIsPressed(false);
          }, 300);

        const apiClient = setupAPI()

        const response = await apiClient.get('/order');

        setOrderList(response.data)

    }  


    async function  handleFechaPedido(id:string){

        const apiClient = setupAPI()

        await apiClient.put('/orderA', {id:id})

        const response = await apiClient.get('/order');
        
        toast.success('pedido finalizado com sucesso')

        setOrderList(response.data)

        setOpenDialog(false);
    } 




     Modal.setAppElement('#__next') 

    return (
        <>
        <Head>
            <title> Painel - Pizzaria</title>
        </Head>

        <div>
            <Header />
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Ultimos pedidos</h1>
                    <button onClick={refreshOrder} className={isPressed ? 'pressed' : ''}>
                      <FiRefreshCcw color="#3fffa3" size={25}  />
                    </button>
                </div>
                <article className={styles.listOrders}>

                   {orderList.length === 0 && (
                      <span className={styles.emptyList}>
                           Nenhum pedido aberto... 
                      </span>  
                   )}

                  {orderList.map(item => (

                    <section key={item.id} className={styles.orderItem} >
                        <button onClick={() => handleDetalheMesa(item, item.id)}>
                                <div className={styles.tag}></div>
                                <span> Mesa {item.table}</span>
                        </button>
                    
                    </section> 

                  ) )}

                </article>

            </main>
         {openDialog &&  (
            <ModalOrder  isOpen={openDialog} onRequestClose={handleCloseDialog} order={modalItem} finishOrder ={handleFechaPedido} leva ={mostra}/>
       )}  

        </div>


       
        </>

    )

}    


export const getServerSideProps = canSSAuth(async (ctx) => {
    const apiClient = setupAPI(ctx);

    const response = await apiClient.get('/order');
   
    return {
        props: {
            ListaOrdem : response.data
        }
      }

})