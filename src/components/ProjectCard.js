import React from 'react';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => {
    return {
        root: {
            
        },
        avatar: {
            height: '50px',
            width: '50px'
        },
        chipStyle: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            '& > *': {
              margin: theme.spacing(0.5),
            },
        }
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

function Login({title, author, description, chips}) {
    const classes = useStyles();
    return (
        <div>
            <Card elevation={2} style={{border: '1px solid grey'}} className={classes.root}>
                <CardHeader  
                    style={{backgroundColor: '#f7f7f7'}}
                    avatar={
                        <Avatar className={classes.avatar} >
                            {randomString(1)}
                        </Avatar>
                    }
                    title={
                        <Typography color="primary" variant="body1">
                        {title}
                        </Typography>
                    }
                    subheader={"by: " + author}                    
                />
                <CardContent style={{}}>
                    
                    <Typography variant="body1" >
                        {description}
                    </Typography>

                    <div className={classes.chipStyle} style={{marginTop: '10px'}}>
                        {chips.map(tag => {
                            return <Chip label={tag}/>
                        })}
                    </div>
                </CardContent>    
                <CardActions  style={{backgroundColor: '#f7f7f7'}}> 
                    <Grid  container justify="center">
                        <Grid item>
                            <Button size="small" color="primary">
                            view
                            </Button>
                            <Button size="small" color="primary">
                            Bookmark
                            </Button>
                        </Grid>
                    </Grid>
                        
                    
                </CardActions>                
                
            </Card>

        </div>
    );
  }
  
  export default Login;
  