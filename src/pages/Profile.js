import { Avatar, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import BasicInfo from '../components/BasicInfo';
import Education from '../components/Education';
import Chips from '../components/Chips';
import Experience from '../components/Experience';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: '1000px',
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
        flex: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        },
        avatar: {
            width: theme.spacing(15),
            height: theme.spacing(15),
            marginTop: '40px',
            marginBottom: '50px',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
        
        
    }
});

function Profile() {
    const { currentUserData } = useAuth()
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root} elevation={3}>                  
                <Avatar className={classes.avatar}/>
                <BasicInfo />
                <Education />            
                <Experience />
                <Chips title="Interests" items={currentUserData.interests} />
                <Chips title="Skills" items={currentUserData.skills} />
            </Paper>
        </div>
    );
  }
  
  export default Profile;
  