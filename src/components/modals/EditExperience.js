import { Button, IconButton, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => {
    return {
        flex: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        root: {
            padding: '50px',
            position: 'absolute',
            width: "800px",
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }

    }
});


export default function EditExperience({ handleClose, open }) {
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            gekki
            <div align="center">
                
            </div>
            <Button onClick={handleClose}>close</Button>
        </Paper>
    )
}
