import React from 'react'
import { useNavigate } from 'react-router-dom';
import style from './index.module.css'
import Input from '../../components/Input'
import Table from './TableTransferencias'
import useFetch from '../../custom-hooks/UseFetch'
import Button from '../../components/Button'
import Numerador from '../../components/Numerador'
import UseForm from '../../custom-hooks/UseForm'
import { GET_SALDOS, GET_TRANSFERENCIAS } from '../../services/api'

const Pesquisa = () => {

    document.title = "Desafio Supera - Transacoes"

    const navigate = useNavigate();
    const { dados, loading, error, request } = useFetch();
    const [dadosTransferencias, setDadosTransferencias] = React.useState();
    const [saldo, setSaldo] = React.useState();
    const [url, setUrl] = React.useState();


    const cabecalhos = [
        "Data",
        "Valor",
        "Tipo",
        "Nome operador Transação"
    ]
    
    const idConta = window.localStorage.getItem('token') 
    const dataInicio = UseForm();
    const dataFim = UseForm();
    const nomeOperador = UseForm();

    async function getTransferencias() {
        const { url, options } = 
            GET_TRANSFERENCIAS(idConta, dataInicio.value, dataFim.value, nomeOperador.value);

        setUrl(url)
        const { response, json } = await request(url, options);

        if (response.ok) {
            setDadosTransferencias(json)
            console.log(json)
            console.log(response)
        }
    }

    async function getSaldos() {
        const { url, options } = GET_SALDOS(idConta, dataInicio.value, dataFim.value, nomeOperador.value);
        const { response, json } = await request(url, options);

        if (response.ok) {
            setSaldo(json)
            console.log(response)
            console.log(json)
        } else {
            console.log(response)
            console.log(json)
        }
    }

    function getDadosTransferencias() {
        getTransferencias()
        getSaldos()
    }

    React.useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            navigate("/");
        }

        getDadosTransferencias();
    }, [])


    return (
        <div className={style.container}>
            <div className={style.header}>
                <Input label={"Data Inicio"} type={"date"} {...dataInicio} />
                <Input label={"Data Fim"} type={"date"} {...dataFim} />
                <Input label={"Nome"} placeholder={"Nome do Operador"} type={"text"} {...nomeOperador} />
                <Button onClick={() => getDadosTransferencias()}>Pesquisar</Button>
            </div>

            {
                (dadosTransferencias && saldo)
                    ?
                    <>
                        <table style={{'borderStyle':'none'}}>
                            <thead>
                                <tr className={style.saldos}>
                                    <th>Saldo Total: R$ {saldo.saldoTotal.toFixed(2).replace(".", ",")}</th>
                                    <th>saldo Periodo: R$ {saldo.saldoPeriodo.toFixed(2).replace(".", ",")}</th>
                                </tr>
                            </thead>
                        </table>
                        <Table headers={cabecalhos} data={dadosTransferencias.content} />
                        <Numerador
                            first={dadosTransferencias.first}
                            last={dadosTransferencias.last}
                            number={dadosTransferencias.number}
                            totalPages={dadosTransferencias.totalPages}
                            currentUrl={url}
                            setDados={setDadosTransferencias}
                        />
                    </>
                    : null
            }

            <div>
                <Button onClick={() => {
                    window.localStorage.removeItem('token')
                    navigate("/")
                }}>Sair</Button>
            </div>
        </div>
    )
}

export default Pesquisa