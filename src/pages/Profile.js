import { Avatar, Button, ButtonBase, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { BorderBottom } from '@material-ui/icons';
import React from 'react';
import BasicInfo from '../components/BasicInfo';
import Education from '../components/Education';
import Chips from '../components/Chips';
import Experience from '../components/Experience';


const txt = "dsaiddhasdhasdal dsakljdsklad dsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdsklad dsaiddhasdhasdal dsakljdsklad dsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdsklad dsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdskladdsaiddhasdhasdal dsakljdsklad";

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

function Profile() {
    const classes = useStyles();
    const firstName = "Zhiwei";
    return (
        <div>
        
        <Paper className={classes.root} elevation={3}>                  
            <BasicInfo />
            <Education />            
            <Experience />
            <Chips title="Interests" items={["programming", "drawing", "eating", "video games", "league of legends", "movies"]} />
            <Chips title="Skills" items={["C++", "React", "Material UI", "HTML/CSS/JS", "JAVA", "NodeJS"]} />
        </Paper>
        </div>
    );
  }
  
  export default Profile;
  