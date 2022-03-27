import React from 'react'
import style from './index.module.css'


const Input = ({ 
    id, label,value, type, disabled, onChange, placeholder,
    maxLength 
}) => {

    return (
      <>
        <label className={style.label}>
          {label}
          <br />
          <input
            className={style.input}
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
          />
        </label>
      </>
    );
  };

export default Input;