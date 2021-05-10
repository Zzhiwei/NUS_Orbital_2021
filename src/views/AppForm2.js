import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Card, Grid, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paperStyle: {       
       padding: '30px',
       paddingTop: '30px',       
       height: '450px',
       width: '410px',
       margin: '50px auto',
       
  }
}));

function AppForm(props) {
    const classes = useStyles();

    const { children } = props;
    return (
        <div >
                <Grid container  >                                         
                        <Card  variant='elevation' elevation='4' className={classes.paperStyle}>
                            {children}
                        </Card>                                         
                    
                                                       
                </Grid>
            
        </div>
    );
  }
  
  export default AppForm;
  