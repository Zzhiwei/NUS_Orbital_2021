import React from 'react';
import { Grid, makeStyles, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => {
    return {
    }
});

function EducationBlock({institution, from, to}) {
    const classes = useStyles();
    
    return (
        <div >               
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} >
                        <TextField
                        id="outlined-read-only-input"
                        label="Institution"
                        defaultValue={institution}                    
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}                    
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                        id="outlined-read-only-input"
                        label="From"
                        defaultValue={from}                                                                        
                        InputProps={{
                            readOnly: true,
                        }}                    
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <TextField
                        id="outlined-read-only-input"
                        label="To"
                        defaultValue={to}                                                                           
                        InputProps={{
                            readOnly: true,
                        }}                    
                        />
                    </Grid>
                </Grid>
                    
                    
                    

                    
                                    
        </div>
    );
  }
  
  export default EducationBlock;
  