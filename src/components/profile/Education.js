import React from 'react';
import {  Tooltip, Zoom, IconButton, makeStyles, Modal, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import EditEducation from './modals/EditEducation'
import EducationBlock from './EducationBlock'




const useStyles = makeStyles((theme) => {
    return {
        title: {
            paddingBottom: '10px',
            borderBottom: '2px solid #4C4556',
            margin: '20px auto'
        }
    }
});

function Education({ userData, enableEdit }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const educationList = userData.education.map((edu, index) => {
        return (
            <div key={index}>
                <EducationBlock institution={edu.institution} from={edu.from} to={edu.to} enableEdit={enableEdit}/>
            </div>
        )
    })

    const handleClose = () => {
        setOpen(false)
    }

    const renderAdd = () => {
        if (enableEdit) {
            return (
                <div align="center">
                    <Tooltip title="Add education" TransitionComponent={Zoom} TransitionProps={{ timeout: 600 }}>
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
                    Education
                </Typography>
                <Modal
                    open={open}
                    onClose={null}
                >
                    <div>
                        <EditEducation handleClose={handleClose} open={open}/>
                    </div>
                </Modal>
                {educationList}
                <br />
                {renderAdd()}
        </div>
    );
  }
  
  export default Education;
  