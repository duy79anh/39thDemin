import React from 'react'
import {TextField,Grid} from '@material-ui/core';
import {useFormContext,Controller} from 'react-hook-form';
const FormEmail = ({name,label,required}) => {
    const {control}=useFormContext();
    return (
       <>
          <Controller  
          as={TextField} 
          control={control}
          fullWidth
          name={name}
          label={label}
          required={required}
        
          />
       </>   
    )
}

export default FormEmail