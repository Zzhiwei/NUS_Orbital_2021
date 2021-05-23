import React from 'react';
import { makeStyles, FormControl, Select as MuiSelect, MenuItem, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  label : {
    textAlign: "left",
    marginLeft: "20px"
  },
  select: {
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
  const { name, label, value, placeholder, onChange, options} = props;

  return (
    <div>
      <div className={classes.label}>
        <Typography>
            {label}
        </Typography>
      </div>
      <FormControl className={classes.select} variant="outlined"> 
        <MuiSelect 
          name={name}
          value={value}
          onChange={onChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            <div className={classes.unselected}>
              {placeholder}
            </div>
          </MenuItem>
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