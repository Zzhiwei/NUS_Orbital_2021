import React from 'react';
import { makeStyles, FormControl, Select as MuiSelect, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  label : {
    textAlign: "left",
    marginLeft: "20px"
  },
  select: {
    textAlign: "left",
    background: "white",
    borderRadius: "4px",
  },
  unselected: {
    opacity: "0.5",
    textAlign: "left"
  }
}))

export default function Select(props) {

  const classes = useStyles();
  const { name, label, value, onChange, options, error=null} = props;

  return (
    <div>
      <FormControl className={classes.select} fullWidth/*variant="outlined*/ 
        {...(error && {error: true})}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect 
          style={{backgroundColor: '#f6eee3'}}
          name={name}
          value={value}
          label={label}
          onChange={onChange}
          displayEmpty
          
        >
            {/* <MenuItem value="" disabled>
              <div className={classes.unselected}>
                {placeholder}
              </div>
            </MenuItem> */}
          {
            options.map(
              item => (<MenuItem key= {item.id} value={item.value}>{item.value}</MenuItem>)
            )
          }
        </MuiSelect>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  )
}