import React, { useState } from 'react';
import {  IconButton, Grid, InputLabel, makeStyles , TextField,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Dialog,
    Button,
    Modal
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "firebase/app"
import _ from 'lodash'
import EditIcon from '@material-ui/icons/Edit';

import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import EditExperience from './modals/EditExperience'


const useStyles = makeStyles(() => {
    return {
        root: {
            marginBottom: '50px',
        },
        iconRoot: {
            '&:hover': {
                color: 'red'
            },
        },
        delete: {
            
        }
    }
});

function ExperienceBlock({ customProps, enableEdit, index }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    console.log({customProps})

    const {  
        category,
        organization,
        fromMonth,
        fromYear,
        toMonth,
        toYear,
        description
    } = customProps

    const { currentUser, currentUserData, setCurrentUserData } = useAuth()
    
    const handleDelete = async () => {

        setLoading(true)
        await db.collection('users').doc(currentUser.uid).update({
            experience: firebase.firestore.FieldValue.arrayRemove(customProps)
        })

        const filteredList = currentUserData.experience.filter(item => {
            return !(_.isEqual(item, customProps))
       })
   
       setCurrentUserData({
           ...currentUserData,
           experience: filteredList
       })
       setOpen(false)
       setLoading(false)
    }

    function renderEdit() {
        if (enableEdit) {
            return (
                <div>
                    <IconButton 
                        classes={{
                            root: classes.iconRoot
                        }}
                        onClick={() => setModalOpen(true)}
                    >
                        <EditIcon className={classes.delete}/>
                    </IconButton>
                    <Modal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                    >
                        <div>
                            <EditExperience index={index} customProps={customProps} handleClose={() => setModalOpen(false)} />
                        </div>
                    </Modal>
                </div>
            )
        }
    }

    const renderDelete = () => {
        if (enableEdit) {
            return (
                <div>
                    <IconButton 
                        classes={{
                            root: classes.iconRoot
                        }}
                        onClick={() => setOpen(true)}
                    >
                        <DeleteIcon className={classes.delete}/>
                    </IconButton>
                     <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button disabled={loading} onClick={handleDelete} color="primary">
                            Yes
                        </Button>
                        <Button onClick={() => setOpen(false)} color="primary">
                            No
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                
            )
        }
    }

    return (
        <div className={classes.root}>    
                <Grid container spacing={3}>
                    <Grid item xs={4} >
                        <InputLabel align="left">
                            Category
                        </InputLabel>
                        <TextField 
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}      
                            value={category}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel align="left"> 
                            Organization
                        </InputLabel>
                        <TextField 
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}      
                            value={organization}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container spacing={0}>
                            <Grid item >
                                {renderEdit()}
                            </Grid>
                            <Grid item >
                                {renderDelete()}
                            </Grid>
                        </Grid>
                            
                    </Grid>
                    
                    
                </Grid>

                <br />
                
                <Grid container>
                    <Grid item xs={6} >
                        <InputLabel align="left" style={{ marginBottom: '5px'}}> 
                            From 
                        </InputLabel>
                        <Grid container spacing={3}> 
                            <Grid item xs={4}>
                                <TextField 
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}      
                                    value={fromMonth}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField 
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}      
                                    value={fromYear}
                                />
                            </Grid>
                        </Grid>               

                        
                    </Grid>

                    <Grid item xs={6} >
                        <InputLabel align="left" style={{ marginBottom: '5px'}}> 
                            To 
                        </InputLabel>
                        <Grid container spacing={3}> 
                            <Grid item xs={4}>
                                <TextField 
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}      
                                    value={toMonth}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                 <TextField 
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}      
                                    value={toYear}
                                />
                            </Grid>
                        </Grid>  
                    </Grid>
                </Grid>
                <br />

                <InputLabel align="left" style={{marginBottom: '10px'}}> 
                    Description
                </InputLabel>
                <TextField 
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}     
                    multiline
                    value={description}
                    variant="outlined"
                />
                    
                    

                    
                                    
        </div>
    );
  }
  
  export default ExperienceBlock;
  