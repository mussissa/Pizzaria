import { Header } from '@/components/Header'
import styles from './styles.module.scss'
import Head from "next/head"
import { ChangeEvent, FormEvent, useState } from 'react';
import { canSSAuth } from '@/utils/canSSRAuth';
import { FiUpload } from 'react-icons/fi';
import { setupAPI } from "@/services/api"
import { toast } from 'react-toastify';




type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  ListaCategoria: ItemProps[];
}


export default function Produto({ListaCategoria}:CategoryProps ){

    const [name, setName ] = useState('')
    const [valor, setValor] = useState('')
    const [Descr, setDescr] = useState('')

    const [avatarUrl, setAvatarUrl] = useState('');
    const [fotoUrl, setfotoUrl] = useState(null);

    const [categoria, setCategoria] = useState(ListaCategoria || []);
    const [categoriaSelecionada, setcategoriaSelecionada] = useState('')


    async function handleRegisterProduto(event:FormEvent){
 
       event.preventDefault();


       if(name === '' || valor === '' || Descr === '' || fotoUrl === null){
        toast.warning('Precisa preencher o campo');
        
          return;
       }




       try {
        const apiClient = setupAPI();

       const data = new FormData();
       
       data.append('name', name)
       data.append('price', valor)
       data.append('description', Descr)
       data.append('category_id', categoria[categoriaSelecionada].id)
       data.append('file', fotoUrl)  

       await apiClient.post('/product', data)

        toast.success('produto cadastrado com sucesso')
       
        setName(''); setValor(''); setDescr(''); setcategoriaSelecionada('');setfotoUrl(null); setAvatarUrl('');

       } catch (error) {
        console.log(error);
        toast.error('erro ao cadastrar produto')
       }



        return;

    }



    async function handleChangeCategoria(event) {
      setcategoriaSelecionada(event.target.value)
   
      
    }

    async function hanfleFile(event: ChangeEvent<HTMLInputElement>) {
     
      if(!event.target.files){
        return;
      }

      const imagem = event.target.files[0];

      if(!imagem){
        return;
      }

      if(imagem.type==='image/png' || imagem.type==='image/jpeg'){
        setfotoUrl(imagem)
        setAvatarUrl(URL.createObjectURL(event.target.files[0]))
      }
      
    }
   
    
    return(
        <>
        <Head>
            <title> Novo Produto</title>
        </Head>
        

        <div>
          <Header />

          <main className={styles.container}>
            <h1>Novo Produto</h1>
            <form className={styles.form} onSubmit={handleRegisterProduto}>
             
              <label className={styles.labelAvatar}>
                <span> 
                  <FiUpload size={25} color="#FFF" />
                </span>
                <input type="file" accept=" image/png, image/jpeg" onChange={hanfleFile}/>
           
                {avatarUrl && (  
                   <img className={styles.preview} src={avatarUrl}   alt="foto do produto" width={250} height={250}  />
                 )}   

              </label>

              <select className={styles.select} value={categoriaSelecionada} onChange={handleChangeCategoria}>
                {categoria.map((item, index) =>{
                    return(
                      <option key={item.id} value={index}>
                        {item.name}
                      </option>
                    )
                })}

              </select> 

              <input className={styles.input} 
                       type='text' placeholder= "nome do produto" value={name} onChange={(e)=>setName(e.target.value)} />
              <input className={styles.input}
                       type='text' placeholder= "Valor"  value={valor} onChange={(e)=> setValor(e.target.value)} />
              <textarea className={styles.textarea} placeholder= "Descrição" 
                                            value={Descr} onChange={(e)=>setDescr(e.target.value)}  />  
              <button className={styles.buttonAdd} type='submit'>
                Cadastrar
              </button>

            </form>
          </main>
        </div>
        
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