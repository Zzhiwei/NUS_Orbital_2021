import React, { useState } from 'react'
import { Zoom, Tooltip, makeStyles, Avatar, Modal, Menu, MenuItem, IconButton, Typography } from '@material-ui/core';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';

import PictureCropper from './Cropper/PictureCropper'
import { useAuth } from '../../contexts/AuthContext'


const useStyles = makeStyles((theme) => {
    return {
        root: {
            position: 'relative',
            marginBottom: '40px',
            
        },
        avatar: {
            width: theme.spacing(25),
            height: theme.spacing(25),
            marginTop: '40px',
            marginBottom: '10px',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        avatarOptions: {
            position: 'absolute',
            width: theme.spacing(5),
            height: theme.spacing(5),
            right: '300px',
            bottom: '60px',
            color: 'black',
            backgroundColor: 'white',
            '&:hover': {
                backgroundColor: 'white'
            }
        }
    }
});

export default function ProfileAvatar({ userData, enableEdit}) {
    console.log("rendering profileAvatar")
    const classes = useStyles()

    const { currentUserData } = useAuth()
    //cropper
    const [open, setOpen] = useState(false);



    const handleCropperOpen = () => {
        setOpen(true);
        
      };
    
      const handleCropperClose = () => {
        setOpen(false);
      };
    

    const renderCameraIcon = () => {
        if (enableEdit) {
            return (
                <Tooltip title="Change Profile Picture" TransitionComponent={Zoom} TransitionProps={{ timeout: 600 }} placement="right">
                    <IconButton className={classes.avatarOptions} size="small" onClick={handleCropperOpen}>
                        <SwapVerticalCircleIcon color="primary"  fontSize="large" />
                    </IconButton>
                </Tooltip>
            )
        }
    }

    

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
             
            <Avatar src={userData.profilePicture} className={classes.avatar}/>
            {renderCameraIcon()}
            <Typography variant="h4" align="center">
                {userData.basicInfo.firstName + " " + userData.basicInfo.lastName}
            </Typography>
        </div>
    )
}
