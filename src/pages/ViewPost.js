import { Avatar, Typography, Grid, TextField, FormControl, Card, Chip } from '@material-ui/core';
import React, { useState } from 'react';
import AppForm from '../views/AppForm2';
import ChipInput from 'material-ui-chip-input';
import AuthorCard from '../components/AuthorCard';

function ViewPost() {

  const title="ProjectName";
  const description="Some details about ProjectName"

  return (
    <AppForm>
      <div style={{marginBottom: '20px'}}>
        <Typography variant="h4" color="primary" gutterBottom  align="center">
          {title}
        </Typography >
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Avatar>2</Avatar>
        </Grid>
        <Grid item xs={6}>
          Other members
        </Grid>
        <Grid item xs={12}>
          <ChipInput 
            label="Required Skills"
            variant="outlined"
            fullWidth
            defaultValue={["HTML", "CSS"]}
          />
        </Grid>
        <Grid item xs={6}>
          <ChipInput 
            label="Location"
            variant="outlined"
            defaultValue={["Online"]}
          />
        </Grid>
        <Grid item xs={6}>
          <ChipInput 
            label="Schedule"
            variant="outlined"
            defaultValue={["Daily 3-5pm"]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            label="Project Description"
            variant="outlined"
            value={description}
            multiline
            fullWidth
          />
        </Grid>
      </Grid>
    </AppForm>
  );
}

export default ViewPost;