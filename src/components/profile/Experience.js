import React from 'react';
import {  IconButton, makeStyles, Modal, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ExperienceBlock from './ExperienceBlock'
import EditExperience from './modals/EditExperience'





const useStyles = makeStyles((theme) => {
    return {
        title: {
            paddingBottom: '12px',
            borderBottom: '2px solid black',
            marginBottom: '20px'
        }
    }
});

function Experience({ userData, enableEdit }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const experienceList = userData.experience.map((exp, index) => {
        
        return (
            <div key={index}>
                <ExperienceBlock  customProps={exp} enableEdit={enableEdit}/>
            </div>
        )
    })

    const renderAdd = () => {
        if (enableEdit) {
            return (
                <div align="center">
                    <IconButton onClick={() => setOpen(true)} size="medium">
                        <AddCircleOutlineIcon color="primary" fontSize="large" />
                    </IconButton> 
                </div>
            )
        }
    }
    
    return (
        <div style={{marginBottom: '30px'}}>
                <Typography className={classes.title} color="primary" variant="h4">
                    Experience
                </Typography>

                <Modal
                    open={open}
                    onClose={null}
                >   
                    <div>
                        <EditExperience handleClose={handleClose} open={open}/>
                    </div>
                </Modal>
                {experienceList}
                {renderAdd()}
                
                
        </div>
    );
  }
  
  export default Experience;
  