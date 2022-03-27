import React from 'react'

const UseForm = (type) => {
    const [value, setValue] = React.useState("");

    function onChange({target}){
        setValue(target.value)
    }
  
    return {
      value,
      setValue,
      onChange
    };
  };
  
  export default UseForm;