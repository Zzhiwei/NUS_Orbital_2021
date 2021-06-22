import React from 'react';
import {  Zoom, IconButton, makeStyles, Modal, Tooltip, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import ExperienceBlock from './ExperienceBlock'
import EditExperience from './modals/EditExperience'





const useStyles = makeStyles((theme) => {
    return {
        title: {
            paddingBottom: '10px',
            borderBottom: '2px solid #4C4556',
            margin: '20px auto'
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
                    <Tooltip title="Add an experience" TransitionComponent={Zoom} TransitionProps={{ timeout: 600 }}>
                        <IconButton onClick={() => setOpen(true)} size="medium">
                            <AddCircleOutlineIcon color="primary" fontSize="large" />
                        </IconButton> 
                    </Tooltip>
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
  