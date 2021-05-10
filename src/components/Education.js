import React from 'react';
import { Avatar, Button, ButtonBase, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import EducationBlock from './EducationBlock';


const useStyles = makeStyles((theme) => {
    return {
        root: {
            // {border: '1px solid red',}            
            width: '60%',
            margin: 'auto auto',            
            padding: '10px 100px'            
            
        },        
        btn: {
            width: '100%'
        },
        category: {
            margin: "10px",
            borderBottom: '1px solid grey'
        },
        avatar: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            margin: '0px auto'
        },
        flex: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
            
        },
        
        
    }
});

function Education() {
    const classes = useStyles();
    
    return (
        <div style={{marginBottom: '30px'}}>
                <Typography align="center" color="primary" variant="h4" style={{marginBottom: '30px'}}>
                        Education
                </Typography>
                <form  align="center" noValidate autoComplete="off" onSubmit={null}>
                    {/* {written in material UI grid as opposed to flex box } */}                    
                    <EducationBlock institution="Anglo-Chinese School (Independent)" from="2012" to="2017" />                    
                    <EducationBlock institution="National University of Singapore" from="2020" to="current" />
                                        
                    
                </form>
        </div>
    );
  }
  
  export default Education;
  