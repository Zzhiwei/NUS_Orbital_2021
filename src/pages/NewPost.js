import { Typography, Grid, makeStyles, TextField, FormControl } from '@material-ui/core';
import React, { useState } from 'react';
import AppForm from '../views/AppForm2';
import ChipInput from 'material-ui-chip-input';

function NewPost() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (      
    <AppForm>
      <div style={{marginBottom: '20px'}}>
        <Typography variant="h4" color="primary" gutterBottom  align="center">
          Create a New Post
        </Typography >
      </div>

      <form align="center" noValidate autoComplete="off" onSubmit={null}>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <FormControl style={{width: "75%", marginBottom: '10px'}}>
              <TextField 
              label="Project Title"
              //variant="outlined"
              value={title}
              onChange={e => setTitle(e.target.value)}
              /> 
            </FormControl>
          </Grid>

          <Grid item xs = {12}>
            <ChipInput 
              label="Required Skills"
              variant="outlined"
              fullWidth
            />
          </Grid>
          
          <Grid item xs = {6}>
            <FormControl style={{marginBottom: '15px'}}>
              <ChipInput 
                label="Location(s)"
                variant="outlined"
                helperText="online, west side, etc"
              />
            </FormControl>
          </Grid>

          <Grid item xs = {6}>
            <FormControl style={{marginBottom: '15px'}}>
              <ChipInput
                label="Schedule"
                variant="outlined"
                helperText="daily 3-5pm, OTOT, etc"
              />
              </FormControl>
          </Grid>

          <Grid item xs={12}>
              <TextField 
              label="Project Description" 
              variant="outlined" 
              multiline 
              fullWidth
              value={description}
              onChange={e => setDescription(e.target.value)}
              />   
          </Grid>

        </Grid>
      </form>
    </AppForm>   
  );
}
  
export default NewPost;
  