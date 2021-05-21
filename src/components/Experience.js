import React from 'react';
import {  IconButton, makeStyles, Modal, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EditExperience from './modals/EditExperience'
import { useAuth } from '../contexts/AuthContext';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExperienceBlock from './ExperienceBlock'




const useStyles = makeStyles((theme) => {
    return {
        title: {
            paddingBottom: '12px',
            borderBottom: '2px solid black',
            marginBottom: '20px'
        }
    }
});

function Experience() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const { currentUserData } = useAuth()

    const handleClose = () => {
        setOpen(false)
    }

    const experienceList = currentUserData.experience.map(exp => {
        
        return (
            <div>
                <ExperienceBlock customProps={exp}/>
            </div>
        )
    })
    
    return (
        <div style={{marginBottom: '30px'}}>
                <Typography className={classes.title} color="primary" variant="h4">
                    Experience
                </Typography>

                <Modal
                    open={open}
                    onClose={null}
                >
                    <EditExperience handleClose={handleClose} open={open}/>
                </Modal>
                {experienceList}
                <div align="center">
                    <IconButton size="medium">
                        <AddCircleOutlineIcon onClick={() => setOpen(true)} color="primary" fontSize="large" />
                    </IconButton> 
                </div>
                
                
        </div>
    );
  }
  
  export default Experience;
  