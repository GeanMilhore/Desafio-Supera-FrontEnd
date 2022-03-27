import React from 'react'
import style from './index.module.css'

import Input from '../../components/Input'
import Button from '../../components/Button'
import UseFetch from '../../custom-hooks/UseFetch'
import { POST_AUTHENTICATE } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import UseForm from '../../custom-hooks/UseForm'

const Login = () => {

    const navigate = useNavigate();
    const {dados, error, loading, request } = UseFetch();
    const [warning, setWarning] = React.useState(false);

    React.useEffect(() => {
        if(window.localStorage.getItem('token')){
            navigate('/transferencias')
        }    
    }, [])
    
    const usuario = UseForm();
    const numeroBanco = UseForm();

    async function autenticar(){
        let body = {
            nome_responsavel: usuario.value,
            id_conta: numeroBanco.value
        }

        const {url, options} = POST_AUTHENTICATE(body)
        const {response, json} = await request(url, options)

        if(response.ok){
            window.localStorage.setItem('token', json.id_conta)
            navigate('/transferencias')
        }
        if(response.status === 400){
            setWarning(true)
            setTimeout(() => {
                setWarning(false)
            }, 3000)
        }
    }

    return (
        <div className={style.container}>
            <Input label={"Usuário"} {...usuario} />
            <Input label={"Número da Conta"} {...numeroBanco} />
            <Button onClick={() => autenticar()}>entrar</Button>
            {warning ? <span style={{'color':'red'}}>{error.details}</span> : null}
        </div>
    )
}

export default Login