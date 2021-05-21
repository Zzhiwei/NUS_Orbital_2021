import { makeStyles, Typography, Chip, Modal, IconButton } from '@material-ui/core';
import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import EditInterests from './modals/EditInterests'
import EditIcon from '@material-ui/icons/Edit';


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


export default function Interests() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const { currentUserData } = useAuth()

    const handleClose = () => {
        setOpen(false)
    }

    const interestList = currentUserData.interests.map(interest => {
        return <Chip label={interest}> </Chip>
    })

    const toRender = (
        <div className={classes.root}>
            {interestList}
        </div>
    )



    

    return (
        <div style={{marginBottom: '30px'}}>
            <Typography className={classes.title} color="primary" variant="h4">
                Interests
                <IconButton onClick={() => setOpen(true)}>
                    <EditIcon  />
                </IconButton> 
            </Typography> 
            <Modal
                open={open}
                onClose={null}
            > 
                <EditInterests interests={currentUserData.interests} handleClose={handleClose} open={open}/>
            </Modal>
            {toRender}
        </div>
    )
}
