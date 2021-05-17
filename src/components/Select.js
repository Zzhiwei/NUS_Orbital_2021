import React from 'react';
import { makeStyles, FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  select: {
    background: "white",
  }
}))

export default function Select(props) {

  const classes = useStyles();
  const { name, label, value, onChange, options} = props;

  return (
    <FormControl className={classes.select} variant="outlined"> 
      <InputLabel>
        {label}
      </InputLabel>
      <MuiSelect 
        
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        <MenuItem value="">
          -
        </MenuItem>
        {
          options.map(
            item => (<MenuItem key= {item.id} value={item.id}>{item.value}</MenuItem>)
          )
        }
      </MuiSelect>
    </FormControl>
  )
}