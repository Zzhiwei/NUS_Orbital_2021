import React from 'react';
import {  makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
    }
});

function Education() {
    
    return (
        <div style={{marginBottom: '30px'}}>
                <Typography align="center" color="primary" variant="h4" style={{marginBottom: '30px'}}>
                        Education
                </Typography>
                <form  align="center" noValidate autoComplete="off" onSubmit={null}>
                    {/* {written in material UI grid as opposed to flex box } */}                    
                    {/* <EducationBlock institution="National University of Singapore" from="2020" to="current" /> */}
                </form>
        </div>
    );
  }
  
  export default Education;
  