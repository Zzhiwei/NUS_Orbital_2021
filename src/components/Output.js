import {TextField, Typography, makeStyles} from "@material-ui/core";
import React from 'react';

const useStyles = makeStyles((theme) => ({
  label : {
    textAlign: "left",
    marginLeft: "20px"
  },
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
    <div>
        <Typography className={classes.label}>
            {label}
        </Typography>
        <TextField
            inputProps={{readOnly: true}}
            //InputProps={{disableUnderline: true, classes: {input: classes.input}}}
            variant="outlined"
            className={classes.text}
            name={name}
            value={value}
            rows={rows}
            fullWidth
            multiline
        />
    </div>
  )
}
