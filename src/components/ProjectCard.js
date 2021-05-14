import { Avatar, Card, CardContent, CardHeader, Chip, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    root: {
        height: '250px'   
    },
    avatar: {
        height: '50px',
        width: '50px'
    }
})

function randomString(len) {
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

function Login({title, author, description}) {
    const classes = useStyles();
    return (
        <div>
            <Card elevation={2} style={{border: '1px solid grey'}} className={classes.root}>
                <CardHeader  
                    avatar={
                        <Avatar className={classes.avatar} >
                            {randomString(1)}
                        </Avatar>
                    }
                    title={
                        <Typography variant="body1">
                        {title}
                        </Typography>
                    }
                    subheader={"by: " + author}                    
                />
                <CardContent style={{borderTop: '1px solid gray'}}>
                    
                    <Typography variant="body2">
                        {description}
                    </Typography>

                    <div style={{marginTop: '10px'}}>
                        <Chip label="Web dev"></Chip>
                    </div>

                    <div>
                        
                    </div>
                </CardContent>                    
                
            </Card>

        </div>
    );
  }
  
  export default Login;
  