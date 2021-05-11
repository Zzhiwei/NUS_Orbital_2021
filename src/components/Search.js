import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';



function Search({toggleFilter}) {
    
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
                    <Grid item xs={6}  style={{marginBottom: '20px'}}>
                        <TextField variant="outlined" label="Search"  fullWidth/>
                    </Grid>
                    
                    <Button color="primary" variant="contained" style={{marginLeft: '20px', marginTop: '0px', height: '55px', width: '100px'}}>
                        Search
                    </Button>

                    <Button onClick={toggleFilter(true)} variant="outlined" startIcon={<TuneIcon />} style={{marginLeft: '20px', marginTop: '0px', height: '55px', width: '100px'}}>
                        filter
                    </Button>
                    
                </Grid>
            </form>
        </div>
    );
  }
  
  export default Search;
  