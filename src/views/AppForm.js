import React from 'react';
import { Card, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paperStyle: {
       padding: '50px 60px',       
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
  