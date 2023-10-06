"use client"
import { useState } from 'react'
import styles from './finances.module.css'

import ListaTransacao from "@/models/ListaTransacao";

import { FaPen, FaTrash } from 'react-icons/fa'
import Transacao from '@/models/Transacao';
import DashCard from '../components/Dashcard';


const listaTransacao = new ListaTransacao()

function Finances() {
  // Inputs
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  // Dados
  const [lista, setLista] = useState(listaTransacao.getHistorico());
  const [saldo, setSaldo] = useState(listaTransacao.saldo);
  const [receita, setReceita] = useState(listaTransacao.receitas);
  const [despesa, setDespesa] = useState(listaTransacao.despesas);

  // Edição
  const [flag, setFlag] = useState(0)
  const [editButton, setEditButton] = useState(false)



  // Adicionar receita
  const addReceita = () => {
    //console.log('Adicionando receita');
    listaTransacao.adicionarTransacao(description, value, "Receita");         // Adiciona a transação

    atualizarValores();
  }


  const addDespesa = () => {
    //console.log('Adicionando despesa');
    listaTransacao.adicionarTransacao(description, value, "Despesa");         // Adiciona a transação

    atualizarValores();
  }

  const exclude = (id) => {
    listaTransacao.excluirTransacao(id);                                      // Exclui a transação


    atualizarValores();
  }

  const edit = (id) => {
    const transacao = listaTransacao.getTransacaoPorId(id);                        // Pega a transação

    setDescription(transacao.descricao);
    setValue(transacao.valor);

    setEditButton(true);
    setFlag(id);
  }

  const update = () => {
    listaTransacao.atualizarTransacao(flag, description, value);                 // Edita a transação

    atualizarValores();

    setEditButton(false);
    setFlag(0);
  }

  const atualizarValores = () => {
    setDescription('');                                           // Limpa os inputs
    setValue('');                                                 // Limpa os inputs

    setSaldo(listaTransacao.saldo);                               // Atualiza o saldo
    setReceita(listaTransacao.receitas);                           // Atualiza as receitas
    setDespesa(listaTransacao.despesas);
    setLista(listaTransacao.getHistorico());                           // Atualiza a lista de transações
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <p className={styles.welcome}>Olá, Marina</p>
          <p className={styles.useremail}>descubranerd@gmail</p>
        </div>
      </div>

      <div className={styles.content}>
      
        <div className={styles.mainheader}>
          <p className={styles.title}>Dashboard</p>
          <div className={styles.transaction}>
            <div className={styles.description}>
              <input
                className={styles.inputdescription}
                value={description}
                type="text"
                name='description'
                placeholder='Descrição'
                onChange={(e) => setDescription(e.target.value)}
              />
              <input className={styles.inputdescription} value={value} type="number" name='description' placeholder='Valor (R$)' onChange={(e) => setValue(e.target.value)} />
            </div>
            <div className={styles.type}>
              {
                editButton === true ? (
                  <button className={styles.buttonAtualizar} onClick={update}>Atualizar</button>
                ) : (
                  <>
                    <button className={styles.buttonreceita} onClick={addReceita}>Receita</button>
                    <button className={styles.buttondespesa} onClick={addDespesa}>Despesa</button>
                  </>
                )
              }
            </div>
          </div>
        </div>
        <div className={styles.infos}>
          <DashCard titulo={"Teste"} valor={saldo} cor={"#FFF"} />
          <div className={styles.cardSaldo}>
            <p className={styles.cardTitle}>Saldo</p>
            <p className={styles.cardValue}>R$ {saldo}</p>
          </div>
          <div className={styles.cardReceitas}>
            <p className={styles.cardTitle}>Receitas</p>
            <p className={styles.cardValue}>R$ {receita}</p>
          </div>
          <div className={styles.cardDespesas}>
            <p className={styles.cardTitle}>Despesas</p>
            <p className={styles.cardValue}>R$ {despesa}</p>
          </div>
        </div>

        <div className={styles.registros}>
          <div className={styles.registrosreceitas}>
            <p className={styles.registrosreceitastitle}>Receitas Registradas</p>
            <div className={styles.registrosreceitaslist}>
              {
                lista.map(transacao =>
                  transacao.tipo == "Receita" && (
                    <div key={transacao.id} className={styles.registrosreceitasitem}>
                      <p>{transacao.descricao}</p>
                      <p className={styles.registrosreceitasitemvalue}>R$ {transacao.valor}</p>

                      <div className={styles.actions}>
                        <button
                          className={styles.actionsbutton}
                          onClick={() => exclude(transacao.id)}
                        >
                          <FaTrash />
                        </button>

                        <button
                          className={styles.actionsbutton}
                          onClick={() => edit(transacao.id)}
                        >
                          <FaPen />
                        </button>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>

          <div className={styles.registrosdespesas}>
            <p className={styles.registrosdespesastitle}>Despesas Registradas</p>
            <div className={styles.registrosdespesaslist}>
              {
                lista.map(transacao =>
                  transacao.tipo == "Despesa" && (
                    <div key={transacao.id} className={styles.registrosdespesasitem}>
                      <p>{transacao.descricao}</p>
                      <p className={styles.registrosdespesasitemvalue}>R$ {transacao.valor}</p>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionsbutton}
                          onClick={() => exclude(transacao.id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          className={styles.actionsbutton}
                          onClick={() => edit(transacao.id)}
                        >
                          <FaPen />
                        </button>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Finances