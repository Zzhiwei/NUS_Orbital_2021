import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function handleClose(reason, setOpen) {
    if (reason === 'clickaway') {
        return
    }
    setOpen(false)
}

export function ValidationSnackBar({ open, setOpen, message, autoHideDuration=5000 }) {
    
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={autoHideDuration} 
            onClose={(reason) => handleClose(reason, setOpen)}
        >
            <MuiAlert 
                elevation={6} 
                variant="filled" 
                onClose={(reason) => handleClose(reason, setOpen)}
                severity="warning"
            >
                {message}
            </MuiAlert>
        </Snackbar>
    )

}

export function BookmarkSnackBar({ open, setOpen, autoHideDuration=2000 }) {

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={autoHideDuration} 
            onClose={(reason) => handleClose(reason, setOpen)}
        >
            <MuiAlert 
                elevation={6} 
                variant="filled" 
                onClose={(reason) => handleClose(reason, setOpen)}
                severity="success"
            >
                Post bookmarked!
            </MuiAlert>
        </Snackbar>
    )

}

export function UnbookmarkSnackBar({ open, setOpen, autoHideDuration=2000 }) {

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={autoHideDuration} 
            onClose={(reason) => handleClose(reason, setOpen)}
        >
            <MuiAlert 
                elevation={6} 
                variant="filled" 
                onClose={(reason) => handleClose(reason, setOpen)} 
                severity="info"
            >
                Post removed from bookmarks
            </MuiAlert>
        </Snackbar>
    )

}

