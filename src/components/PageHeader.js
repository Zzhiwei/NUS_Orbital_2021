import React from 'react';
import { makeStyles, Avatar, Typography, Container, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  avatar: {
      margin: theme.spacing(1),
      color: "white",
      backgroundColor: theme.palette.primary.main,
      width: '50px',
      height: '50px',
  },
  subTitle: {
    marginTop: theme.spacing(-1.25),
    opacity: "0.6",
  }
}));

export default function PageHeader(props) {

  const classes = useStyles();
  const { title, subTitle, icon} = props;

  return (
    <Container component="main" maxWidth="xs"> 
        <CssBaseline />
        <div className={classes.header}>
            <Avatar className={classes.avatar}>
                {icon}
            </Avatar>
            <Typography variant="h5" component="h1" gutterBottom>
                {title}
            </Typography> 
            <Typography className={classes.subTitle} variant="subtitle2" component="h1" gutterBottom>
                {subTitle}
            </Typography> 
        </div>
    </Container>
  )
}