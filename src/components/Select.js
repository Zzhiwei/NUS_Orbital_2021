import React from 'react';
import { makeStyles, FormControl, Select as MuiSelect, MenuItem, Typography, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
  const { name, label, value, onChange, options} = props;

  return (
    <div>
      {/* <Typography className={classes.label}>
          {label}
      </Typography> */}
      <FormControl className={classes.select} fullWidth/*variant="outlined*/> 
        <InputLabel>{label}</InputLabel>
        <MuiSelect 
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
      </FormControl>
    </div>
  )
}