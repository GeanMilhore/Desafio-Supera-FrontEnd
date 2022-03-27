import React from 'react'
import style from './index.module.css'
import Button from '../Button'
import useFetch from '../../custom-hooks/UseFetch'
import { GET_PAGINAS } from '../../services/api'

const Numerador = ({ first, last, number, totalPages, currentUrl, setDados }) => {

  const { request } = useFetch()

  async function voltarPagina(qtdVolta) {
    const { url, options } = GET_PAGINAS(currentUrl, number - qtdVolta, 4);
    const { response, json } = await request(url, options);

    if (response.ok) {
      console.log(response)
      console.log(json)
      setDados(json)
    }
  }

  async function avancarPagina(qtdAvanca) {
    const { url, options } = GET_PAGINAS(currentUrl, number + qtdAvanca, 4);
    const { response, json } = await request(url, options);

    if (response.ok) {
      console.log(response)
      console.log(json)
      setDados(json)
    }
  }


  async function navegarPagina(pagina) {
    const { url, options } = GET_PAGINAS(currentUrl, pagina, 4);
    const { response, json } = await request(url, options);

    if (response.ok) {
      console.log(response)
      console.log(json)
      setDados(json)
    }
  }

  return (
    <div className={style.containerNumerador}>
      <div className={style.numerador}>
        <Button disabled={number <= 1} onClick={() => voltarPagina(2)}>{"<<"}</Button>

        <Button disabled={first} onClick={() => voltarPagina(1)}>{"<"}</Button>

        {last && (number - 1) > 0 ? <Button onClick={() => navegarPagina(number - 2)}>{number - 1}</Button> : null}

        {number >= 1 ? <Button onClick={() => navegarPagina(number - 1)}>{number}</Button> : null}

        <span>{number + 1}</span>

        {number < totalPages - 1 ? <Button onClick={() => navegarPagina(number + 1)}>{number + 2}</Button> : null}

        {first && (number + 2) < totalPages ? <Button onClick={() => navegarPagina(number + 2)}>{number + 3}</Button> : null}

        <Button disabled={last} onClick={() => avancarPagina(1)}>{">"}</Button>

        <Button disabled={number >= totalPages - 2} onClick={() => avancarPagina(2)}>{">>"}</Button>
      </div>
      <span>Total de Páginas: {totalPages}</span>
    </div>
  )
}

export default Numerador