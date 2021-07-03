import React, { useState, useEffect } from 'react'
import { Zoom, Tooltip, makeStyles, Avatar, Modal, IconButton, Typography } from '@material-ui/core';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';

import PictureCropper from './Cropper/PictureCropper'
import { storage } from '../../firebase';


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
            width: theme.spacing(6),
            height: theme.spacing(6),
            right: '300px',
            bottom: '60px',
            color: 'black',
            backgroundColor: '#f6eee3',
            '&:hover': {
                backgroundColor: '#f6eee3'
            }
        }
    }
});

export default function ProfileAvatar({ userData, enableEdit, id, setAvatarKey}) {
    console.log("rendering profileAvatar")
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState(null)



    const handleCropperOpen = () => {
        setOpen(true);
        
      };
    
      const handleCropperClose = () => {
        setOpen(false);
      };

    async function getProfilePicture() {
        await storage.ref(`profile_pictures/${id}`).getDownloadURL().then(url => {
            setLink(url)
        }).catch(err => {
            setLink(null)
        })

    }
    

    const renderCameraIcon = () => {
        if (enableEdit) {
            return (
                <Tooltip title="Change Profile Picture" TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} placement="right">
                    <IconButton className={classes.avatarOptions} size="small" onClick={handleCropperOpen}>
                        <CropOriginalIcon color="primary"  fontSize="large" />
                    </IconButton>
                </Tooltip>
            )
        }
    }

    
    useEffect(async () => {
        if (userData.hasProfilePicture) {
            await getProfilePicture()
        }
    }, [])

    

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
                    <PictureCropper setAvatarKey={setAvatarKey} closeCropper={handleCropperClose}/>
                </div>   
            </Modal>
             
            <Avatar src={link} className={classes.avatar}/>
            {renderCameraIcon()}
            <Typography variant="h4" align="center">
                {userData.basicInfo.firstName + " " + userData.basicInfo.lastName}
            </Typography>
        </div>
    )
}
