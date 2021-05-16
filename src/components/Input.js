import { TextField } from '@material-ui/core';
import React from 'react';

export default function Input(props) {

  const {name, label, value, variant, placeholder, onChange, rows, error=null} = props;

  return (
    <TextField
      multiline
      variant={variant}
      label={label}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      rows={rows}
      {...(error && {error:true, helperText:error})}
    />
  )
}
