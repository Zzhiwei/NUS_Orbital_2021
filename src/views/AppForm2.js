import React from 'react';
import { Card, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paperStyle: {       
       padding: '30px',
       paddingTop: '30px',       
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
  