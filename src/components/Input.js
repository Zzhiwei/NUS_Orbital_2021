import {TextField, makeStyles, Typography} from "@material-ui/core";
import React from 'react';

const useStyles = makeStyles((theme) => ({
  label : {
    textAlign: "left",
    marginLeft: "20px"
  },
  text: {
    background: "white",
    borderRadius: "4px",
  }
}))

export default function Input(props) {

  const classes = useStyles();
  const {inputProps, name, label, value, variant, placeholder, onChange, rows, error=null} = props;

  return (
    <div>
      <div className={classes.label}>
        <Typography>
          {label}
        </Typography>
      </div>
      <TextField
        className={classes.text}
        variant={variant}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
        {...(error && {error:true, helperText:error})}
        fullWidth
        multiline
        inputProps={inputProps}
      />
    </div>
  )
}
