import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Card, Grid, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paperStyle: {
       padding: '50px 60px',       
       height: '450px',
       width: '300px',
       margin: 'auto auto'
       
  }
}));

function AppForm(props) {
    const classes = useStyles();

    const { children } = props;
    return (        
                                         
                    <div style={{paddingTop: '50px'}}>                    
                        <Card variant='elevation' elevation='4' className={classes.paperStyle}>
                            {children}
                        </Card>                    
                    </div>                    
                
            
        
    );
  }
  
  export default AppForm;
  