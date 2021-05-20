import React from 'react';
import { makeStyles,  Typography } from '@material-ui/core';


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

function Experience() {
    const classes = useStyles();
    
    return (
        <div style={{marginBottom: '30px'}}>
                <Typography align="center" color="primary" variant="h4" style={{marginBottom: '30px'}}>
                        Experience
                </Typography>
                {/* <ExperienceBlock propsCat="other projects" organization="nil" workDescription="build a personal website as a showcase of my porfolio" /> */}

        </div>
    );
  }
  
  export default Experience;
  