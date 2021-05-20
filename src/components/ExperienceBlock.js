import React from 'react';
import { Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => {
    return {
        formControl: {
            
            minWidth: 120,
          }               
    }
});

function EducationBlock({propsCat, workDescription, organization}) {
    const classes = useStyles();
    const [cat, setCat] = React.useState(propsCat);
    const handleChange = (event) => {
        setCat(event.target.value);
      };
    
    return (
        <div style={{borderLeft:  '3px dotted black', paddingLeft: '10px', marginBottom: '50px'}}>               
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Grid container>
                            <Grid item xs={4} lg={3} style={{marginBottom: '10px'}}>                                
                                <InputLabel id="demo-simple-select-readonly-label">Category</InputLabel> 
                                <Select
                                fullWidth
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly" 
                                value={cat}
                                onChange={handleChange}
                                inputProps={{ readOnly: true }}
                                >
                                <MenuItem value=""> 
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"work"}>Work</MenuItem>
                                <MenuItem value={"competition"}>Competition</MenuItem>
                                <MenuItem value={"volunteer"}>volunteer</MenuItem>
                                <MenuItem value={"other projects"}>Other projects</MenuItem>
                                </Select>                                                            
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="demo-simple-select-readonly-label">Organization</InputLabel> 
                                <TextField value={organization} fullWidth inputProps={{readOnly: true}}></TextField>
                            </Grid>                                                                        
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <InputLabel id="demo-simple-select-readonly-label">Description</InputLabel> 
                        <TextField  multiline value={workDescription} inputProps={{readOnly: true}} variant="outlined" fullWidth></TextField>
                    </Grid>                    
                </Grid>
                    
                    
                    

                    
                                    
        </div>
    );
  }
  
  export default EducationBlock;
  