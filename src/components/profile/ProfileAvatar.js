import React, { useState } from 'react'
import { makeStyles, Avatar, Modal, Menu, MenuItem, IconButton } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import PictureCropper from './Cropper/Cropper'
import { useAuth } from '../../contexts/AuthContext'


const useStyles = makeStyles((theme) => {
    return {
        root: {
            position: 'relative',
        },
        avatar: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            marginTop: '40px',
            marginBottom: '50px',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        avatarOptions: {
            position: 'absolute',
            right: '345px',
            bottom: '3px',
            backgroundColor: 'white',
            '&:hover': {
                backgroundColor: 'white'
            }
        }
    }
});

export default function ProfileAvatar({ enableEdit}) {
    console.log("rendering profileAvatar")
    const classes = useStyles()

    const { currentUserData } = useAuth()
    //options
    const [anchorEl, setAnchorEl] = useState(null);
    //cropper
    const [open, setOpen] = useState(false);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCropperOpen = () => {
        setOpen(true);
        handleOptionsClose()
      };
    
      const handleCropperClose = () => {
        setOpen(false);
      };
    

    const handleOptionsClose = () => {
        setAnchorEl(null);
    };

    

    return (
        <div className={classes.root}>
             <Modal
                style={{ width: '100vw', height: '100vh'}}
                open={open}
                onClose={null}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    <PictureCropper    closeCropper={handleCropperClose}/>
                </div>   
            </Modal>
             
            <Avatar src={currentUserData.profilePicture} className={classes.avatar}/>
            <IconButton className={classes.avatarOptions} size="small" onClick={handleClick}>
                <CameraAltIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleOptionsClose}
                
            >
                <MenuItem onClick={handleCropperOpen}>change</MenuItem>
            </Menu>
        </div>
    )
}
