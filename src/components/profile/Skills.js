import { makeStyles, Typography, Chip, Modal, IconButton } from '@material-ui/core';
import React from 'react'
import EditIcon from '@material-ui/icons/Edit';

import EditSkills from './modals/EditSkills'
import { useAuth } from '../../contexts/AuthContext';



const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
              margin: theme.spacing(0.5),
            },
        },
        title: {
            paddingBottom: '12px',
            borderBottom: '2px solid black',
            marginBottom: '20px'
        }
    }
});


export default function Skills({ userData, enableEdit }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const skillList = userData.skills.map(skill => {
        return <Chip label={skill}> </Chip>
    })

    const toRender = (
        <div className={classes.root}>
            {skillList}
        </div>
    )

    const renderEdit = () => {
        if (enableEdit) {
            return (
                <IconButton onClick={() => setOpen(true)}>
                    <EditIcon  />
                </IconButton>
            )
        }
    }


    return (
        <div style={{marginBottom: '30px'}}> 
            <Typography className={classes.title} color="primary" variant="h4">
                Skills
                {renderEdit()}
            </Typography> 
            <Modal
                open={open}
                onClose={null}
            > 
                <EditSkills skills={userData.skills} handleClose={handleClose} open={open}/>
            </Modal>
            {toRender}
        </div>
    )
}
