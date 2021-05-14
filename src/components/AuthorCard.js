import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 16,
  },
  avatar: {
    height: "50px",
    width: "50px"
  }
});

const author = "Author"

function randomString(len) {
  var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var randomString = '';
  for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}

function AuthorCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <CardHeader  
        avatar={
          <Avatar className={classes.avatar} >
            {randomString(1)}
          </Avatar>
        }
        title={
          <Typography variant="body1">
            {author}
          </Typography>
        }                   
      />
      <CardActions>
        <Button size="small">Telegram handle</Button>
      </CardActions>
    </Card>
  );
}

export default AuthorCard;