import React, { useRef, useState } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import _ from 'lodash'

import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import BasicInfo from '../components/profile/BasicInfo';
import Education from '../components/profile/Education';
import Experience from '../components/profile/Experience';
import Interests from '../components/profile/Interests';
import Skills from '../components/profile/Skills'
import ProfileAvatar from '../components/profile/ProfileAvatar'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: '1000px',
            margin: 'auto auto',            
            padding: '10px 100px'            
            
        }
    }
});

function Profile() {
    console.log("rerender profile")
    const { currentUser, currentUserData } = useAuth()
    const classes = useStyles()
    const { id } = useParams()

    const viewingOwn = useRef(null)

    const [renderOptions, setRenderOptions] = useState({
        userData: null,
        enableEdit: null,
        infoReceived: false
    })


    /*
        determining if logged in user is viewing his own profile
        if yes: enable edit options, pass currentUserData as prop down to various section components
        if no: disable edit options, pass other user's data as prop
    */
    if (viewingOwn.current === null) {
        if (currentUser === null || id !== currentUser.uid) {
            viewingOwn.current = false
        } else {
            viewingOwn.current = true
        }
    }

    
    
    //tricky part: surprisingly setState() triggers rerender even though state nv changed, so have to resort to manual checking
    //or else would have infinite loop
    const getUserData = async () => {
        await db.collection('users').doc(id).get().then(res => {
            const otherUserData = res.data()
            if (!_.isEqual(renderOptions.userData, otherUserData)) { //manual check
                setRenderOptions({
                    userData: res.data(),
                    enableEdit: false,
                    infoReceived: true
                })
            }
            
        }) 
    }

    if (viewingOwn.current && !_.isEqual(renderOptions.userData, currentUserData)) { //manual check
        setRenderOptions({
            userData: currentUserData,
            enableEdit: true,
            infoReceived: true
        })
    } else {
        getUserData()
    }

    
    
    
    const renderContent = () => {
        if ( !renderOptions.infoReceived ) {
            return <div align="center">Loading...</div>
        } 
        return (
            <div>
                <Paper className={classes.root} elevation={3}>                  
                    <ProfileAvatar userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>
                    <BasicInfo userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>
                    <Education userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>            
                    <Experience userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>
                    <Interests userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>
                    <Skills userData={renderOptions.userData} enableEdit={renderOptions.enableEdit}/>
                </Paper>
            </div>
        )
    }

    return renderContent()
  }
  
  export default Profile;
  