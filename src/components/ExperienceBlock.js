import React from 'react';
import {  Grid, InputLabel, makeStyles , TextField, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import firebase from "firebase/app"
import _ from 'lodash'







const useStyles = makeStyles((theme) => {
    return {
        root: {
            marginBottom: '50px',
            // padding: '10px',
            // border: '2px dotted black'
        },
        deleteButton: {
            color: '#ff4081',
            marginLeft: 'auto'
        }
    }
});

function ExperienceBlock({ customProps, enableEdit }) {
    const classes = useStyles();

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
    
    const handleDelete = () => {
        db.collection('users').doc(currentUser.uid).update({
            experience: firebase.firestore.FieldValue.arrayRemove(customProps)
        })

        const filteredList = currentUserData.experience.filter(item => {
            return !(_.isEqual(item, customProps))
       })
   
       setCurrentUserData({
           ...currentUserData,
           experience: filteredList
       })

    }

    const renderDelete = () => {
        if (enableEdit) {
            return (
                <Button
                    className={classes.deleteButton}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    size="small"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
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

                    {renderDelete()}
                    
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
  