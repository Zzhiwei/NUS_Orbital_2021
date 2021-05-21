import React from 'react';
import {  IconButton, makeStyles, Modal, Typography } from '@material-ui/core';
import EditEducation from './modals/EditEducation'
import { useAuth } from '../contexts/AuthContext';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EducationBlock from './EducationBlock'




const useStyles = makeStyles((theme) => {
    return {
        title: {
            paddingBottom: '12px',
            borderBottom: '2px solid black',
            marginBottom: '20px'
        }
    }
});

function Education() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const { currentUserData } = useAuth()

    const xs = currentUserData.education

    const educationList = xs.map(edu => {
        return (
            <div>
                <EducationBlock institution={edu.institution} from={edu.from} to={edu.to}/>
            </div>
        )
    })

    const handleClose = () => {
        setOpen(false)
    }
    
    return (
        <div style={{marginBottom: '30px'}}>
                <Typography className={classes.title} color="primary" variant="h4">
                    Education
                </Typography>

                <Modal
                    open={open}
                    onClose={null}
                >
                    <EditEducation handleClose={handleClose} open={open}/>
                </Modal>
                {educationList}
                <div align="center">
                    <IconButton onClick={() => setOpen(true)} size="medium">
                        <AddCircleOutlineIcon color="primary" fontSize="large" />
                    </IconButton> 
                </div>

                
                
                
        </div>
    );
  }
  
  export default Education;
  