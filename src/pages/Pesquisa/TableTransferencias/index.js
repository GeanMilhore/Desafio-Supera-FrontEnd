import React from 'react'
import style from './index.module.css'

const Table = ({ headers, data }) => {
  return (
    <table border="1" className={style.table}>
      <thead>
        <tr>
          {headers.map(head => <th key={head}>{head}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(item => <tr key={item.id}>
          <td>{item.data_transferencia}</td>
          <td>R$ {item.valor.toFixed(2).replace(".", ",")}</td>
          <td>{item.tipo}</td>
          <td>{item.nomeOperador}</td>
        </tr>)}
      </tbody>
    </table>
  )
}

export default Table