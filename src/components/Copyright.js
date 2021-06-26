import { Typography, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
      align: "center",
      margin: theme.spacing(5, 0, 3) 
  }
}))

export default function Copyright() {
  const classes = useStyles()
  return (
      <div className={classes.root}>
          <Typography variant="body2" align="center">
              {'Copyright © partnerUp '}
              {new Date().getFullYear()}
              {'.'}
          </Typography>
      </div>
  );
}