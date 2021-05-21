import React from 'react';
import { Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from '../firebase'
import firebase from "firebase/app"
import { useAuth } from '../contexts/AuthContext'
import _ from 'lodash'

const useStyles = makeStyles((theme) => {
    return {
        iconRoot: {
            paddingBottom: '0px'
        }
    }
});

function EducationBlock({institution, from, to}) {
    const classes = useStyles();

    const { currentUser, currentUserData, setCurrentUserData } = useAuth()

    const handleDelete = async () => {

        const currentUserRef = db.collection('users').doc(currentUser.uid)

        await currentUserRef.update({
            education: firebase.firestore.FieldValue.arrayRemove({
                institution,
                from,
                to
            })
        })
      
        const filteredList = currentUserData.education.filter(item => {
             return !(_.isEqual(item, {
                 to,
                 from,
                 institution
             }))
        })
    
        setCurrentUserData({
            ...currentUserData,
            education: filteredList
        })


    }

    return (
        <div >               
                <Grid container spacing={3}>
                    <Grid item  xs={6} >
                        <TextField
                        label="Institution"
                        value={institution}                    
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}                    
                        />
                    </Grid>
                    <Grid item xs={2} >
                        <TextField
                        label="From"
                        value={from}                                                                        
                        InputProps={{
                            readOnly: true,
                        }}                    
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                        label="To"
                        value={to}                                                                           
                        InputProps={{
                            readOnly: true,
                        }}                    
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
                            <IconButton 
                                classes={{
                                    root: classes.iconRoot
                                }}
                                onClick={handleDelete}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                                    
        </div>
    );
  }
  
  export default EducationBlock;
  