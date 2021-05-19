import {TextField, makeStyles} from "@material-ui/core";
import React from 'react';

const useStyles = makeStyles((theme) => ({
  text: {
    background: "white",
    borderRadius: "4px",
  },
  input: {
    textAlign: "center"
  }
}))

export default function Output(props) {

  const classes = useStyles();
  const {name, label, value, rows } = props;

  return (
    <TextField
      inputProps={{readOnly: true}}
      InputProps={{disableUnderline: true, classes: {input: classes.input}}}
      InputLabelProps={{style: {textAlign: "center"}}}
      className={classes.text}
      label={label}
      name={name}
      value={value}
      rows={rows}
      fullWidth
      multiline
    />
  )
}
