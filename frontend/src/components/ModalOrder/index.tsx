import styles from './styles.module.scss'
import { FiX } from 'react-icons/fi'
import Modal from 'react-modal'
import { OrderItemProps } from '@/pages/dashboard'

export function ModalOrder({isOpen, onRequestClose, order, finishOrder, leva}){
      let totalizador:number = 0
     
     //utiliza forEach no lugar de map pois map retorna um novo array e foreach executa função em cada elemento do array
      order.forEach(element => {
      totalizador +=  parseFloat(element.product.price);
     });

    return (
         <Modal isOpen={isOpen} onRequestClose = {onRequestClose} className={styles.content} >
            {!order.length  ? (
            <button type='button' onClick={leva} className={styles.button}> Não tem nada na mesa - {leva}
                <FiX size={45} color='#f34748' />
            </button>
            ):( 
              <div>     
                  <button type='button' onClick={onRequestClose} className={styles.button}>
                        <FiX size={45} color='#f34748' />
                  </button>

            
                  <div className={styles.container}>
                        <h2> Detalhes do pedido</h2>
                              <span className={styles.table}>
                              Mesa: {order[0].order.table}
                              </span>
                        
                        {order.map(item =>(
                        <section key={item.id} className={styles.containerItem} >
                              <span > {item.product.price} - {item.amount} - <strong> {item.product.name} </strong>  </span>
                              
                      {/*        <span className={styles.description} >
                                    {item.product.description}
                              </span> */}

                        </section>
                        ))}

                        
                        <div className={styles.total}>
                        <h2>TOTAL</h2>  
                        <span>R$ {totalizador}</span> 
                        

                        <button className={styles.buttonOrder} onClick={() => finishOrder(order[0].order_id)}>
                              Concluir pedido
                        </button>
                        </div>
                  </div>
              </div>
            )}
         </Modal>

       
    )

}    