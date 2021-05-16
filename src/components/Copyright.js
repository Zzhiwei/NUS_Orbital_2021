import { Typography } from '@material-ui/core';
import React from 'react';

export default function Copyright() {
  return (
    <Typography variant="body 2" align="center">
      {'Copyright © partnerUp '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}