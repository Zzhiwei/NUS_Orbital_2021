
import { Avatar, Card, CardContent, CardHeader, Chip, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    root: {
        
    }
})

function Login({title, author, description}) {
    const classes = useStyles();
    return (
        <div>
            <Card style={{border: '2px solid grey'}} className={classes.root}>
                <CardHeader  
                    avatar={
                        <Avatar aria-label="recipe" >
                            S
                        </Avatar>
                    }
                    title={
                        <Typography variant="body1">
                        {title}
                        </Typography>
                    }
                    subheader={"by: " + author}                    
                />
                <CardContent>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </CardContent>                    
                
            </Card>

        </div>
    );
  }
  
  export default Login;
  