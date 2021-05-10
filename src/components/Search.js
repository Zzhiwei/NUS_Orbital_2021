import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';



function Search() {
    
    const [level, setLevel] = useState('');
    const [education, setEducation] = useState('');
    const [commitment, setCommitment] = useState('');
    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };
    const handleEducationChange = (event) => {
        setEducation(event.target.value);
    };
    const handleCommitmentChange = (event) => {
        setCommitment(event.target.value);
    };
    return (
        <div style={{margin: '50px 0px'}}>
            <form>
            <Grid container>
                <Grid item xs={0} sm={3}></Grid>
                <Grid item xs={9} sm={6} >
                    <Grid container>
                        <Grid item xs={12}  style={{marginBottom: '10px'}}>
                        <TextField variant="outlined" label="Search"  fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3} justify="center">
                                
                                <Grid item xs={3}>
                                    <FormControl > 
                                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        Level
                                        </InputLabel> 
                                        <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        value={level}
                                        onChange={handleLevelChange}
                                        displayEmpty                                
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"beginner"}>Beginner</MenuItem>
                                        <MenuItem value={"intermediate"}>Intermediate</MenuItem>
                                        <MenuItem value={"advanced"}>Advanced</MenuItem>
                                        </Select>                                
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl > 
                                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        Education
                                        </InputLabel> 
                                        <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        value={education}
                                        onChange={handleEducationChange}
                                        displayEmpty                                
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Pre-U"}>Pre-U</MenuItem>
                                        <MenuItem value={"University"}>University</MenuItem>
                                        <MenuItem value={"Professional"}>Professional</MenuItem>
                                        </Select>                                
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl > 
                                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                            Commitment
                                        </InputLabel> 
                                        <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        value={commitment}
                                        onChange={handleCommitmentChange}
                                        displayEmpty                                
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"casual"}>Casual</MenuItem>
                                        <MenuItem value={"serious"}>Serious</MenuItem>
                                        
                                        </Select>                                
                                    </FormControl>
                                </Grid>
                            </Grid>
                         
                        </Grid>
                    
                    </Grid>
                </Grid>                
            </Grid>       
            </form>
        </div>
    );
  }
  
  export default Search;
  