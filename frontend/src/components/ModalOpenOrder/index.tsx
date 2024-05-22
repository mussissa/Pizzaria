import styles from "./styles.module.scss";
import Modal from "react-modal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FormEvent, useState } from "react";
import { LuEggFried } from "react-icons/lu";
import { setupAPI } from "@/services/api";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button } from "../ui/Button";
import Router from "next/router";

type ItemProductProps = {
  name: string;
  price: string;
  description: string;
};

interface ProductsProps {
  ListaProduto: ItemProductProps[];
}

type ItensProps = {
  id: string;
  product_id: string;
  name: string;
  amount: number;
};

export function ModalOpenOrder({isOpen, onRequestClose, ordem_mesa, ordem_id, apaga, CategoryList}) {

  const [Quant, setQuant] = useState("0");
  const [categoriaSelecionada, setcategoriaSelecionada] = useState("");

  const [produtoSelecionado, setProdutoSelecionado] = useState(0);

  const [produtoList, setprodutoList] = useState([]);

  const [itensList, setitensList] = useState<ItensProps[]>([]);

  const [openNovoModal, setOpenNovoModal] = useState(false);

  const [habilitaButton, setHabilitaButton] = useState(true);

  const apiClient = setupAPI();

  const handleAdd = async () => {
    if (itensList.length > 8) {
      toast.warning(
        "quantidade de itens excede o limite finalize a comanda e abra uma nova comanda pra mesa"
      );
      return;
    }

    const response = await apiClient.post("/addItem", {
      order_id: ordem_id,
      product_id: produtoList[produtoSelecionado].id,
      amount: parseInt(Quant),
    });

    const dados = {
      id: response.data.id as string,
      name: produtoList[produtoSelecionado].name as string,
      product_id: response.data?.product_id as string,
      amount: parseInt(response.data.amount),
    };

    setitensList((array) => [...array, dados]);

    setHabilitaButton(false);

    
  };

  async function handleChangeCategoria(event) {
    setcategoriaSelecionada(event.target.value);

    const selectId = CategoryList[event.target.value].id;


    const helo = await apiClient.get("/product/cat", {
      params: { category_id: selectId },
    });

    setprodutoList(helo.data);
  }

  async function handleChangeProduto(event) {
    setProdutoSelecionado(event.target.value);
  }

  async function handleSendProduct(event: FormEvent) {
    alert("Comdanda é " + ordem_mesa);
    alert(" ID do produto é " + produtoList[produtoSelecionado].id);
    alert("nome do produto é " + produtoList[produtoSelecionado].name);
    alert("Qauntidade é " + Quant);

    console.log(itensList);
  }

  async function handleRemov(index) {
    const updatedItemsList = [...itensList];

    await apiClient.delete("/item", { params: { id: itensList[index].id } });

    updatedItemsList.splice(index, 1);
    

    setitensList(updatedItemsList);

    if (!updatedItemsList.length) {
      setHabilitaButton(true);
    }
  }

  function fechar2() {
    setOpenNovoModal(false);
  }

  async function enviaModal() {

    const response =await apiClient.put("/orderManda", {id:ordem_id});
    if((response).status === 200){
      toast.success('Pedido Enviado')
    }
    Router.push("/");
    setOpenNovoModal(false);
 

  }



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.content}
      shouldCloseOnOverlayClick={false}
    >
      <div>
        <div className={styles.titulo}>
          <span>Mesa {ordem_mesa}</span>

          {itensList.length ? (
            <RiDeleteBin5Line
              size={35}
              color="#f34748"
              onClick={apaga}
              opacity={0.0}
              pointerEvents={"none"}
              cursor={"default"}
            />
          ) : (
            <RiDeleteBin5Line size={35} color="#f34748" onClick={apaga} />
          )}
        </div>
        <div>
          <select
            className={styles.select}
            value={categoriaSelecionada}
            onChange={handleChangeCategoria}
          >
            {CategoryList.map((item, index) => {
              return (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <select
            className={styles.select}
            value={produtoSelecionado}
            onChange={handleChangeProduto}
          >
            {produtoList.map((item, index) => {
              return (
                <option key={item.name} value={index}>
                  {" "}
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className={styles.inputs}>
          <span>Quantidade</span>
          <input
            placeholder=""
            type="number"
            value={Quant}
            onChange={(e) => setQuant(e.target.value)}
          />
        </div>

        <div className={styles.butons}>
          <button type="button" onClick={handleAdd} className={styles.butaoAdd}>
            <IoMdAdd size={38} />
          </button>

          <button
            type="button"
            disabled={habilitaButton}
            onClick={() => setOpenNovoModal(!openNovoModal)}
          >
            {" "}
            Avançar
          </button>
          {openNovoModal && (
            <Modal isOpen={true} onRequestClose={onRequestClose} className={styles._content} shouldCloseOnOverlayClick={false}>
              
              <div className={styles._contentdiv} >
                <span>Deseja enviar Pedido?</span>
                <div>
                <button type="button" onClick={enviaModal} className={styles.button1}>
                  {" "}
                  SIM
                </button>
                <button type="button" onClick={() => setOpenNovoModal(false)}  className={styles.button2}>
                  Não
                </button>
                </div>
              </div>
            </Modal>
          )}
        </div>

        <div>
          {itensList.map((item, index) => (
            <div key={item.id} className={styles.itemLista}>
              <label>
                {item.amount} - {item.name}
              </label>

              <button
                type="button"
                onClick={() => handleRemov(index)}
                className={styles.butonLista}
              >
                <RiDeleteBin5Line size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}


